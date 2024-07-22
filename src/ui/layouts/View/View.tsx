import classNames from "classnames";
import {forwardRef} from "react";

export const ScrollView = forwardRef( (props: React.ComponentProps<"section">, ref) => {
  const { className, ...rest } = props;

  return (
    <section className={classNames("relative h-full overflow-hidden translate-x-0", className)} {...rest} ref={ref}>
      <div className="w-full h-full pb-16 max-h-full overflow-auto">{props.children}</div>
      <span className="absolute bottom-0 left-0 right-0 h-32 w-full bg-gradient-to-t from-white to-[rgba(255, 255, 255,.4)]"></span>
    </section>
  );
});

ScrollView.displayName = "ScrollView"