import styles from "./Badge.module.css";

export default function Badge({ className, children }: { className: string, children: React.JSX.Element | string }) {
  return (
    <span className={`${styles.badge} ${className}`}>
      {children}
    </span>
  );
}

export function BadgeWithTitle({ className, title, children }: { className: string, title: string, children: React.JSX.Element | string }) {
  return (
    <div className={styles.badge_cell}>
      <span className={styles.badge_title}>{title}</span>
      <Badge className={className}>{children}</Badge>
    </div>
  );
}