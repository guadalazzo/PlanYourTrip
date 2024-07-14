import { SVGProps } from 'react';

export default function Loading(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="w-screen h-screen m-auto middle-center">
      <h3 className="text-lg">Loading</h3>
      <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24" {...props}>
        <g>
          <circle cx="3" cy="12" r="2" fill="currentColor"></circle>
          <circle cx="21" cy="12" r="2" fill="currentColor"></circle>
          <circle cx="12" cy="21" r="2" fill="currentColor"></circle>
          <circle cx="12" cy="3" r="2" fill="currentColor"></circle>
          <circle cx="5.64" cy="5.64" r="2" fill="currentColor"></circle>
          <circle cx="18.36" cy="18.36" r="2" fill="currentColor"></circle>
          <circle cx="5.64" cy="18.36" r="2" fill="currentColor"></circle>
          <circle cx="18.36" cy="5.64" r="2" fill="currentColor"></circle>
          <animateTransform
            attributeName="transform"
            dur="1.5s"
            repeatCount="indefinite"
            type="rotate"
            values="0 12 12;360 12 12"
          ></animateTransform>
        </g>
      </svg>
    </div>
  );
}
