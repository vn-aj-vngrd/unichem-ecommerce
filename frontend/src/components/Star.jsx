import { MdStarHalf, MdStar, MdStarOutline } from "react-icons/md";

const Star = ({ star, reviews }) => {
  return (
    <>
      {star === 5 && (
        <ul className="review">
          <li>
            <MdStar className="text-warning" />
          </li>
          <li>
            <MdStar className="text-warning" />
          </li>
          <li>
            <MdStar className="text-warning" />
          </li>
          <li>
            <MdStar className="text-warning" />
          </li>
          <li>
            <MdStar className="text-warning" />
          </li>

          <li>
            <span>({reviews})</span>
          </li>
        </ul>
      )}

      {star < 5 && star > 4 && (
        <ul className="review">
          <li>
            <MdStar className="text-warning" />
          </li>
          <li>
            <MdStar className="text-warning" />
          </li>
          <li>
            <MdStar className="text-warning" />
          </li>
          <li>
            <MdStar className="text-warning" />
          </li>
          <li>
            <MdStarHalf className="text-warning" />
          </li>

          <li>
            <span>({reviews})</span>
          </li>
        </ul>
      )}

      {star === 4 && (
        <ul className="review">
          <li>
            <MdStar className="text-warning" />
          </li>
          <li>
            <MdStar className="text-warning" />
          </li>
          <li>
            <MdStar className="text-warning" />
          </li>
          <li>
            <MdStar className="text-warning" />
          </li>
          <li>
            <MdStarOutline className="text-warning" />
          </li>

          <li>
            <span>({reviews})</span>
          </li>
        </ul>
      )}

      {star < 4 && star > 3 && (
        <ul className="review">
          <li>
            <MdStar className="text-warning" />
          </li>
          <li>
            <MdStar className="text-warning" />
          </li>
          <li>
            <MdStar className="text-warning" />
          </li>
          <li>
            <MdStarHalf className="text-warning" />
          </li>
          <li>
            <MdStarOutline className="text-warning" />
          </li>

          <li>
            <span>({reviews})</span>
          </li>
        </ul>
      )}

      {star === 3 && (
        <ul className="review">
          <li>
            <MdStar className="text-warning" />
          </li>
          <li>
            <MdStar className="text-warning" />
          </li>
          <li>
            <MdStar className="text-warning" />
          </li>
          <li>
            <MdStarOutline className="text-warning" />
          </li>
          <li>
            <MdStarOutline className="text-warning" />
          </li>

          <li>
            <span>({reviews})</span>
          </li>
        </ul>
      )}

      {star < 3 && star > 2 && (
        <ul className="review">
          <li>
            <MdStar className="text-warning" />
          </li>
          <li>
            <MdStar className="text-warning" />
          </li>
          <li>
            <MdStarHalf className="text-warning" />
          </li>
          <li>
            <MdStarOutline className="text-warning" />
          </li>
          <li>
            <MdStarOutline className="text-warning" />
          </li>

          <li>
            <span>({reviews})</span>
          </li>
        </ul>
      )}

      {star === 2 && (
        <ul className="review">
          <li>
            <MdStar className="text-warning" />
          </li>
          <li>
            <MdStar className="text-warning" />
          </li>
          <li>
            <MdStarOutline className="text-warning" />
          </li>
          <li>
            <MdStarOutline className="text-warning" />
          </li>
          <li>
            <MdStarOutline className="text-warning" />
          </li>

          <li>
            <span>({reviews})</span>
          </li>
        </ul>
      )}

      {star < 2 && star > 1 && (
        <ul className="review">
          <li>
            <MdStar className="text-warning" />
          </li>
          <li>
            <MdStarHalf className="text-warning" />
          </li>
          <li>
            <MdStarOutline className="text-warning" />
          </li>
          <li>
            <MdStarOutline className="text-warning" />
          </li>
          <li>
            <MdStarOutline className="text-warning" />
          </li>

          <li>
            <span>({reviews})</span>
          </li>
        </ul>
      )}

      {star === 1 && (
        <ul className="review">
          <li>
            <MdStar className="text-warning" />
          </li>
          <li>
            <MdStarOutline className="text-warning" />
          </li>
          <li>
            <MdStarOutline className="text-warning" />
          </li>
          <li>
            <MdStarOutline className="text-warning" />
          </li>
          <li>
            <MdStarOutline className="text-warning" />
          </li>

          <li>
            <span>({reviews})</span>
          </li>
        </ul>
      )}

      {star < 1 && star > 0 && (
        <ul className="review">
          <li>
            <MdStarHalf className="text-warning" />
          </li>
          <li>
            <MdStarOutline className="text-warning" />
          </li>
          <li>
            <MdStarOutline className="text-warning" />
          </li>
          <li>
            <MdStarOutline className="text-warning" />
          </li>
          <li>
            <MdStarOutline className="text-warning" />
          </li>

          <li>
            <span>({reviews})</span>
          </li>
        </ul>
      )}

      {star === 0 && (
        <ul className="review">
          <li>
            <MdStarOutline className="text-warning" />
          </li>
          <li>
            <MdStarOutline className="text-warning" />
          </li>
          <li>
            <MdStarOutline className="text-warning" />
          </li>
          <li>
            <MdStarOutline className="text-warning" />
          </li>
          <li>
            <MdStarOutline className="text-warning" />
          </li>

          <li>
            <span>({reviews})</span>
          </li>
        </ul>
      )}
    </>
  );
};

export default Star;
