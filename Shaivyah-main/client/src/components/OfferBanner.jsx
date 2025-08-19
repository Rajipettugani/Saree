export default function OfferBanner({ coupon }){
  if (!coupon) return null
  return (
    <div className="bg-brand-600 text-white rounded-2xl p-4 text-center">
      Use code <span className="font-bold">{coupon.code}</span> to get {coupon.discountPct}% off!
    </div>
  )
}
