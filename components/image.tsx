import { ImageProps } from '@lib/types';

const Image = ({ src, alt, priority = false, className }: ImageProps) => {
  return (
    <>
      <div className="img-wrapper">
        <img src={src} alt={alt} className={className} />
      </div>
      {priority ? null : null}
      <style jsx>
        {`
          .img-wrapper {
            display: block;
            overflow: hidden;
            position: absolute;
            top: 0px;
            left: 0px;
            bottom: 0px;
            right: 0px;
            box-sizing: border-box;
            margin: 0px;
          }

          img {
            visibility: inherit;
            position: absolute;
            top: 0px;
            left: 0px;
            bottom: 0px;
            right: 0px;
            box-sizing: border-box;
            padding: 0px;
            border: none;
            margin: auto;
            display: block;
            width: 0px;
            height: 0px;
            min-width: 100%;
            max-width: 100%;
            min-height: 100%;
            max-height: 100%;
            object-fit: cover;
            object-position: center center;
          }
        `}
      </style>
    </>
  );
};

export default Image;
