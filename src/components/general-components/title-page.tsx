import { ArrowRight2 } from 'iconsax-reactjs';

interface TitlePageProps {
  title: string;
  showBackArrow?: boolean;
  onBackClick?: () => void;
}

const TitlePage: React.FC<TitlePageProps> = ({
  title,
  showBackArrow = false,
  onBackClick,
}) => {
  return (
    <div className={`  items-center justify-between text-nowrap`}>
      <div className="flex items-center gap-2 justify-start">

        {showBackArrow && (
          <button
            className="flex items-center justify-center w-8 h-8 "
            aria-label="Go back"
          >
            <ArrowRight2
              onClick={onBackClick}
              size="24"
              color="#FFf"
              className="cursor-pointer"
            />{' '}
          </button>
        )}
        <span className="text-3xl max-lg:text-lg font-bold text-white">
          {title}
        </span>
      </div>
    </div>
  );
};

export default TitlePage;
