import Icon from "../../Assets/SvgImagesAndIcons";
import { TypographyVariant } from "../types";
import Typography from "../Typography";

interface KycNumberOfReportsCardProps {
    isUserVerified?: boolean;
    isUserStarPoints?: boolean;
}
const KycNumberOfReportsCard = ({
    isUserVerified,
    isUserStarPoints,
  }: KycNumberOfReportsCardProps) => {
    return (
      <div className={`w-full mt-3 lg:mt-0 ${
        isUserVerified ? "visibility: visible" : "visibility: hidden"
      }  items-start justify-start border-[1px] border-solid border-[#D0D5DD] ${isUserStarPoints ? "py-6": "py-5"} px-8 rounded-lg mr-4`}>
        <section className="flex justify-between items-center">
         {isUserStarPoints ?  <Icon type="favoriteNote"/> :  <Icon type="home-report-star" className="height-30" />}
          <div className="flex items-center justify-end pt-2 mb-1">
           
            <Typography
                variant={TypographyVariant.SMALL}
                className="text-[#007A61] text-sm"
              >
                view
              </Typography>
            <Icon type="arrowUpSvg" className="pr-2" />
          </div>
        </section>
       
        <Typography
                variant={TypographyVariant.SMALL}
                className="text-light_gray py-4"
              >
               {isUserStarPoints ? "Total star points" : "No. reports started"}
              </Typography>
              <Typography
                variant={TypographyVariant.BOLD}
                className="text-black text-3xl font-bold"
              >
                0
              </Typography>
      </div>
    );
  };

export default KycNumberOfReportsCard;
