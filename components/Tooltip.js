import { cloneElement, useMemo, useState } from "react";
import { offset, flip, shift, autoUpdate, useFloating, useInteractions, useHover, useFocus, useRole, useDismiss } from "@floating-ui/react-dom-interactions";
import { mergeRefs } from "react-merge-refs";

export const Tooltip = ({ children, label, placement = "top" }) => {
  const [open, setOpen] = useState(false);

  const { x, y, reference, floating, strategy, context } = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    middleware: [offset(5), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([useHover(context), useFocus(context), useRole(context, { role: "tooltip" }), useDismiss(context)]);

  // Preserve the consumer's ref
  const ref = useMemo(() => mergeRefs([reference, children.ref]), [reference, children]);

  return (
    <>
      {cloneElement(children, getReferenceProps({ ref, ...children.props }))}
      {open && (
        <div
          {...getFloatingProps({
            ref: floating,
            className: "z-50 w-34 px-4 sm:h-6 h-12 text-sm font-semibold text-gray-500 bg-white rounded-lg border border-gray-200 shadow-sm transition-opacity duration-300",
            style: {
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            },
          })}>
          {label}
        </div>
      )}
    </>
  );
};
