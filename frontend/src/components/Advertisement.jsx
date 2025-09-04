import ad1 from "../assets/images/add1.jpg";
import ad2 from "../assets/images/add2.jpg";
import ad3 from "../assets/images/add3.jpg";
import ad4 from "../assets/images/add4.jpg";

export default function Advertisement({ side }) {
  const ads = side === "left" ? [ad1, ad2] : [ad3, ad4];
  return (
    <div className="flex flex-col gap-4 items-center">
      {ads.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`Ad ${idx + 1}`}
          className="rounded-xl shadow-md w-full max-w-[200px] object-cover"
        />
      ))}
    </div>
  );
}
