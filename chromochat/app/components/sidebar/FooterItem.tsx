import Link from "next/link";

import clsx from "clsx";

interface FooterItemProps {
    href: string;
    icon: any;
    active?: boolean;
    onClick?: () => void;
}

const FooterItem: React.FC<FooterItemProps> = ({ 
    href, 
    icon: Icon, 
    active,
    onClick
}) => {
    const handleClick = () => {
        if (onClick) {
            return onClick();
        }
    };

    return ( 
        <Link 
            onClick={handleClick} 
            href={href} 
            className={clsx(`
                group 
                flex 
                gap-x-3 
                text-sm 
                leading-6 
                font-semibold 
                w-full 
                justify-center 
                p-4 
                text-gray-500 
                hover:text-black 
                hover:bg-thirdColor
            `,
            active && 'bg-midColor text-gray-950',
            )}
        >
            <Icon className="h-6 w-6" />
        </Link>
    );
}
 
export default FooterItem;
