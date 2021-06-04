/**
 * Copyright 2020 Vercel Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export default function IconLogo({
  backgroundColor = 'transparent',
  foregroundColor = 'var(--accents-1)',
  ...props
}) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 900 900"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        fillRule: 'evenodd',
        clipRule: 'evenodd',
        strokeLinejoin: 'round',
        strokeMiterlimit: 1.41421
      }}
    >
      <rect id="Artboard1" x="0" y="0" width="900" height="900" style={{ fill: 'none' }} />
      <clipPath id="_clip1">
        <rect x="0" y="0" width="900" height="900" />
      </clipPath>
      <g clip-path="url(#_clip1)">
        <rect x="0" y="0" width="900" height="900" style={{ fill: backgroundColor }} />
        <path d="M787.5,337.5l-450,450l450,0l0,-450Z" style={{ fill: '#fdd831' }} />
        <circle cx="337.5" cy="337.5" r="225" style={{ fill: '#157efb' }} />
        <path d="M112.5,337.5l450,450l-450,0l0,-450Z" style={{ fill: '#fd5ce7' }} />
      </g>
    </svg>
  );
}
