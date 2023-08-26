import React from 'react'

const TrainSvg: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-train"
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
    <path d="M21 13c0 -3.87 -3.37 -7 -10 -7h-8"></path>
    <path d="M3 15h16a2 2 0 0 0 2 -2"></path>
    <path d="M3 6v5h17.5"></path>
    <path d="M3 10l0 4"></path>
    <path d="M8 11l0 -5"></path>
    <path d="M13 11l0 -4.5"></path>
    <path d="M3 19l18 0"></path>
  </svg>
)

export default TrainSvg
