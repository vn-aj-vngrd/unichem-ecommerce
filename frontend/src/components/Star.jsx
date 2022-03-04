import { MdStarHalf, MdStar, MdStarOutline } from "react-icons/md";

const Star = ({ star, reviews }) => {
  return (
    <div>
      {star === 5 && (
        <div className="d-flex flex-row pt-1">
          <div>
            <MdStar className="text-warning" />
          </div>
          <div>
            <MdStar className="text-warning" />
          </div>
          <div>
            <MdStar className="text-warning" />
          </div>
          <div>
            <MdStar className="text-warning" />
          </div>
          <div>
            <MdStar className="text-warning" />
          </div>

          <div className="ms-1">
            <span>({reviews}1)</span>
          </div>
        </div>
      )}

      {star < 5 && star > 4 && (
        <div className="d-flex flex-row pt-1">
          <div>
            <MdStar className="text-warning" />
          </div>
          <div>
            <MdStar className="text-warning" />
          </div>
        <div>
            <MdStar className="text-warning" />
          </div>
          <div>
            <MdStar className="text-warning" />
          </div>
          <div>
            <MdStarHalf className="text-warning" />
          </div>

          <div className="ms-1">
            <span>({reviews})</span>
          </div>
        </div>
      )}

      {star === 4 && (
        <div className="d-flex flex-row pt-1">
          <div>
            <MdStar className="text-warning" />
          </div>
          <div>
            <MdStar className="text-warning" />
          </div>
          <div>
            <MdStar className="text-warning" />
          </div>
          <div>
            <MdStar className="text-warning" />
          </div>
          <div>
            <MdStarOutline className="text-warning" />
          </div>

          <div className="ms-1">
            <span>({reviews})</span>
          </div>
        </div>
      )}

      {star < 4 && star > 3 && (
        <div className="d-flex flex-row pt-1">
          <div>
            <MdStar className="text-warning" />
          </div>
          <div>
            <MdStar className="text-warning" />
          </div>
          <div>
            <MdStar className="text-warning" />
          </div>
          <div>
            <MdStarHalf className="text-warning" />
          </div>
          <div>
            <MdStarOutline className="text-warning" />
          </div>

          <div className="ms-1">
            <span>({reviews})</span>
          </div>
        </div>
      )}

      {star === 3 && (
        <div className="d-flex flex-row pt-1">
          <div>
            <MdStar className="text-warning" />
          </div>
          <div>
            <MdStar className="text-warning" />
          </div>
          <div>
            <MdStar className="text-warning" />
          </div>
          <div>
            <MdStarOutline className="text-warning" />
          </div>
          <div>
            <MdStarOutline className="text-warning" />
          </div>

          <div className="ms-1">
            <span>({reviews})</span>
          </div>
        </div>
      )}

      {star < 3 && star > 2 && (
        <div className="d-flex flex-row pt-1">
          <div>
            <MdStar className="text-warning" />
          </div>
          <div>
            <MdStar className="text-warning" />
          </div>
          <div>
            <MdStarHalf className="text-warning" />
          </div>
          <div>
            <MdStarOutline className="text-warning" />
          </div>
          <div>
            <MdStarOutline className="text-warning" />
          </div>

          <div className="ms-1">
            <span>({reviews})</span>
          </div>
        </div>
      )}

      {star === 2 && (
        <div className="d-flex flex-row pt-1">
          <div>
            <MdStar className="text-warning" />
          </div>
          <div>
            <MdStar className="text-warning" />
          </div>
          <div>
            <MdStarOutline className="text-warning" />
          </div>
          <div>
            <MdStarOutline className="text-warning" />
          </div>
          <div>
            <MdStarOutline className="text-warning" />
          </div>

          <div className="ms-1">
            <span>({reviews})</span>
          </div>
        </div>
      )}

      {star < 2 && star > 1 && (
        <div className="d-flex flex-row pt-1">
          <div>
            <MdStar className="text-warning" />
          </div>
          <div>
            <MdStarHalf className="text-warning" />
          </div>
          <div>
            <MdStarOutline className="text-warning" />
          </div>
          <div>
            <MdStarOutline className="text-warning" />
          </div>
          <div>
            <MdStarOutline className="text-warning" />
          </div>

          <div className="ms-1">
            <span>({reviews})</span>
          </div>
        </div>
      )}

      {star === 1 && (
        <div className="d-flex flex-row pt-1">
          <div>
            <MdStar className="text-warning" />
          </div>
          <div>
            <MdStarOutline className="text-warning" />
          </div>
          <div>
            <MdStarOutline className="text-warning" />
          </div>
          <div>
            <MdStarOutline className="text-warning" />
          </div>
          <div>
            <MdStarOutline className="text-warning" />
          </div>

          <div className="ms-1">
            <span>({reviews})</span>
          </div>
        </div>
      )}

      {star < 1 && star > 0 && (
        <div className="d-flex flex-row pt-1">
          <div>
            <MdStarHalf className="text-warning" />
          </div>
          <div>
            <MdStarOutline className="text-warning" />
          </div>
          <div>
            <MdStarOutline className="text-warning" />
          </div>
          <div>
            <MdStarOutline className="text-warning" />
          </div>
          <div>
            <MdStarOutline className="text-warning" />
          </div>

          <div className="ms-1">
            <span>({reviews})</span>
          </div>
        </div>
      )}

      {star === 0 && (
        <div className="d-flex flex-row pt-1">
          <div>
            <MdStarOutline className="text-warning" />
          </div>
          <div>
            <MdStarOutline className="text-warning" />
          </div>
          <div>
            <MdStarOutline className="text-warning" />
          </div>
          <div>
            <MdStarOutline className="text-warning" />
          </div>
          <div>
            <MdStarOutline className="text-warning" />
          </div>

          <div className="ms-1">
            <span>({reviews})</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Star;
