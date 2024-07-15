import { IconButton, Tooltip } from "@mui/material";

export default function AdvIconButton({
    /* ICON */ icon: Icon,
    /* NAME */ name,
    /* SIZE */ size,
    /* TOOLTIP PLACMENT */ toolTipPlacement,
}) {
    const offsets = {
        right: [0, -19],
        left: [],
        top: [],
        bottom: [0, -10],
    };

    return (
        <Tooltip
            title={name}
            placement={toolTipPlacement}
            enterDelay={500}
            leaveDelay={200}
            slotProps={{
                popper: {
                    modifiers: [
                        {
                            name: "offset",
                            options: {
                                offset: offsets[toolTipPlacement],
                            },
                        },
                    ],
                },
            }}
        >
            <IconButton size={size} className="icons-buttons" color="secondary">
                <Icon />
            </IconButton>
        </Tooltip>
    );
}
