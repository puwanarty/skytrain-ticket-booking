import React from 'react'

const QrcodeSvg: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-qrcode"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
    <path d="M7 17l0 .01"></path>
    <path d="M14 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
    <path d="M7 7l0 .01"></path>
    <path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
    <path d="M17 7l0 .01"></path>
    <path d="M14 14l3 0"></path>
    <path d="M20 14l0 .01"></path>
    <path d="M14 14l0 3"></path>
    <path d="M14 20l3 0"></path>
    <path d="M17 17l3 0"></path>
    <path d="M20 17l0 3"></path>
  </svg>
)

export default QrcodeSvg
