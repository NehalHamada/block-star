const shimmerStyle = {
  background:
    "linear-gradient(90deg, #f0ebe3 25%, #e8e0d5 50%, #f0ebe3 75%)",
  backgroundSize: "800px 100%",
  animation: "skeleton-shimmer 1.6s infinite linear",
  borderRadius: "8px",
};

const keyframes = `
  @keyframes skeleton-shimmer {
    0%   { background-position: -800px 0; }
    100% { background-position:  800px 0; }
  }
`;

/** A single shimmer block – pass className for sizing */
function Bone({ className = "" }) {
  return <div style={shimmerStyle} className={className} />;
}

/* ─────────────────── variants ─────────────────── */

function ProductSkeleton() {
  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
        {/* Breadcrumb */}
        <Bone className="h-4 w-48 mb-8 opacity-70" />

        <div className="flex flex-col md:flex-row gap-10">
          {/* Image gallery */}
          <div className="flex flex-col gap-3 md:w-1/2">
            <Bone className="h-80 w-full rounded-xl" />
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <Bone key={i} className="h-20 flex-1 rounded-lg" />
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="flex flex-col gap-4 md:w-1/2">
            <Bone className="h-8 w-3/4" />
            <Bone className="h-6 w-1/3" />
            <div className="flex gap-2 mt-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Bone key={i} className="h-4 w-4 rounded-full" />
              ))}
            </div>
            <Bone className="h-4 w-full mt-2" />
            <Bone className="h-4 w-5/6" />
            <Bone className="h-4 w-4/6" />
            <Bone className="h-4 w-3/6 mb-2" />
            <div className="flex gap-3 mt-4">
              <Bone className="h-11 w-32 rounded-lg" />
              <Bone className="h-11 flex-1 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-12">
          <Bone className="h-7 w-48 mx-auto mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Bone key={i} className="h-14 rounded-lg" />
            ))}
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-10">
          <Bone className="h-6 w-40 mb-4" />
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <Bone key={i} className="h-14 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-12 md:py-16">
      {/* Title */}
      <div className="flex flex-col items-center gap-3 mb-8">
        <Bone className="h-9 w-64" />
        <Bone className="h-5 w-80" />
      </div>

      {/* Order card */}
      <Bone className="h-40 w-full rounded-2xl mb-6" />

      {/* Tracking steps */}
      <div className="flex justify-between gap-2 my-8 max-w-5xl mx-auto">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex flex-col items-center gap-2 flex-1">
            <Bone className="h-10 w-10 rounded-full" />
            <Bone className="h-3 w-full rounded" />
          </div>
        ))}
      </div>

      {/* Info grid */}
      <div className="rounded-2xl p-4 sm:p-8 max-w-5xl mx-auto mt-10 border border-secondary/10">
        <Bone className="h-6 w-36 mb-6" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex flex-col gap-2">
              <Bone className="h-4 w-24" />
              <Bone className="h-3 w-32" />
            </div>
          ))}
        </div>
        <div className="border-t border-secondary/20 mt-6 pt-4 flex flex-col gap-3">
          <Bone className="h-4 w-48 self-end" />
          <Bone className="h-5 w-40 self-end" />
        </div>
      </div>
    </div>
  );
}

function CartSkeleton() {
  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-6 px-4">
      <div className="w-full max-w-2xl flex flex-col gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-4 items-center">
            <Bone className="h-20 w-20 rounded-xl flex-shrink-0" />
            <div className="flex flex-col gap-2 flex-1">
              <Bone className="h-5 w-3/4" />
              <Bone className="h-4 w-1/3" />
              <Bone className="h-4 w-1/4" />
            </div>
          </div>
        ))}
        <div className="border-t border-secondary/10 pt-4 flex flex-col gap-3 mt-2">
          <Bone className="h-5 w-40 self-end" />
          <Bone className="h-11 w-full rounded-xl mt-2" />
        </div>
      </div>
    </div>
  );
}

function MessagesSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="border border-gray-100 rounded-2xl p-5 flex flex-col gap-3"
        >
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-2">
              <Bone className="h-5 w-36" />
              <Bone className="h-4 w-48" />
            </div>
            <Bone className="h-7 w-24 rounded-full" />
          </div>
          <Bone className="h-4 w-full mt-1" />
          <Bone className="h-4 w-5/6" />
        </div>
      ))}
    </div>
  );
}

function FormSkeleton() {
  return (
    <div className="flex flex-col gap-4 w-full mx-auto py-4">
      {/* Billing section title */}
      <Bone className="h-6 w-48 mb-2" />

      {/* 2-column fields grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex flex-col gap-2">
            <Bone className="h-4 w-28" />
            <Bone className="h-11 w-full rounded-xl" />
          </div>
        ))}
      </div>

      {/* Notes field */}
      <div className="flex flex-col gap-2">
        <Bone className="h-4 w-20" />
        <Bone className="h-11 w-full rounded-xl" />
      </div>

      {/* Shipping address section */}
      <Bone className="h-6 w-44 mt-6 mb-2" />
      <div className="flex flex-col gap-2">
        <Bone className="h-4 w-36" />
        <Bone className="h-11 w-full rounded-xl" />
      </div>

      {/* New address fields */}
      <div className="bg-secondary/5 p-4 rounded-xl border border-secondary/10 flex flex-col gap-4 mt-2">
        <Bone className="h-5 w-40" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col gap-2">
              <Bone className="h-4 w-24" />
              <Bone className="h-11 w-full rounded-xl" />
            </div>
          ))}
        </div>
      </div>

      {/* Submit button */}
      <Bone className="h-12 w-full max-w-md mx-auto rounded-xl mt-6" />
    </div>
  );
}

function DefaultSkeleton() {
  return (
    <div className="flex justify-center items-center py-20">
      <div
        className="rounded-full border-4 border-secondary/20 border-t-secondary"
        style={{
          width: 48,
          height: 48,
          animation: "skeleton-spin 0.8s linear infinite",
        }}
      />
      <style>{`@keyframes skeleton-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

/* ─────────────────── main export ─────────────────── */

/**
 * @param {{ variant?: 'product' | 'order' | 'cart' | 'messages' | 'form' | 'default' }} props
 */
export function SkeletonLoader({ variant = "default" }) {
  return (
    <>
      <style>{keyframes}</style>
      {variant === "product" && <ProductSkeleton />}
      {variant === "order" && <OrderSkeleton />}
      {variant === "cart" && <CartSkeleton />}
      {variant === "messages" && <MessagesSkeleton />}
      {variant === "form" && <FormSkeleton />}
      {variant === "default" && <DefaultSkeleton />}
    </>
  );
}
