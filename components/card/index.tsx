import Image from "next/image";

const Card = () => {
  return (
    <div className="shadow-xl card w-96 bg-base-100">
      <figure className="px-10 pt-10">
        <Image
          src="https://placeimg.com/400/225/arch"
          alt="Shoes"
          priority
          layout="intrinsic"
          height={200}
          width={270}
        />
      </figure>

      <div className="items-center text-center card-body">
        <div className="shadow stats">
          <div className="stat">
            <div className="capitalize stat-title">Price</div>
            <div className="stat-value">89,400 &#x20b9;</div>
            <div className="stat-desc">0.22 &#240;</div>
          </div>
        </div>
        <h2 className="card-title">Shoes!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions">
          <button className="btn btn-primary">Preview</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
