interface HeadAndSubHeadProps extends React.HTMLAttributes<HTMLDivElement> {
    heading: string,
    subHeading: string,
    className?: string
}

export default function HeadAndSubHead({ heading, subHeading, className, ...props }: HeadAndSubHeadProps) {
    return (
        <div {...props} className={`flex flex-col items-start justify-center dark:text-neutral-300 text-neutral-800 ${className ?? ""}`}>
            <span className="text-lg font-bold">{heading}</span>
            <span className="font-normal text-sm">{subHeading}</span>
        </div>
    )
}