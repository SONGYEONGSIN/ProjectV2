import clsx from "clsx";

interface BadgeProps {
    type: "high" | "medium" | "low" | "new";
}

export function Badge({ type }: BadgeProps) {
    const styles = {
        high: "bg-neo-orange text-white",
        medium: "bg-neo-yellow text-black",
        low: "bg-neo-cyan text-black",
        new: "bg-neo-black text-white animate-pulse",
    };

    const labels = {
        high: "HIGH IMPACT",
        medium: "MEDIUM",
        low: "INFO",
        new: "NEW 2026",
    };

    return (
        <span
            className={clsx(
                "px-2 py-0.5 text-[10px] font-black border border-black",
                styles[type]
            )}
        >
            {labels[type]}
        </span>
    );
}
