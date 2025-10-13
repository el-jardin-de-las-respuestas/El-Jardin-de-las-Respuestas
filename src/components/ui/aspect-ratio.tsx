"use client";

<<<<<<< HEAD
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio@1.1.2";
=======
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
>>>>>>> e3c7280 (commit new)

function AspectRatio({
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />;
}

export { AspectRatio };
