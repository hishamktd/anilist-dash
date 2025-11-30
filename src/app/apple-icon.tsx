import { ImageResponse } from 'next/og';


export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
          borderRadius: '40px',
        }}
      >
        <svg
          width="140"
          height="140"
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M256 100 L356 380 L310 380 L290 330 L222 330 L202 380 L156 380 L256 100 Z M256 180 L235 270 L277 270 L256 180 Z"
            fill="white"
          />
          <rect x="380" y="280" width="40" height="100" rx="8" fill="white" opacity="0.8" />
          <rect x="380" y="320" width="40" height="60" rx="8" fill="white" opacity="0.6" />
          <rect x="92" y="300" width="40" height="80" rx="8" fill="white" opacity="0.8" />
          <rect x="92" y="340" width="40" height="40" rx="8" fill="white" opacity="0.6" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
