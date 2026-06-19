import styles from "./Page.module.css";

export interface PageProps {
  title: string,
  ref: string | null,
  header: React.JSX.Element,
  section: React.JSX.Element,
}

export default function Page(
  { title, ref, header, section }: PageProps
) {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.hero_top}>
          <h1 className={styles.title}>{title}</h1>
          {ref &&
            <a
              className={styles.sourceLink}
              href={ref}
              target="_blank"
              rel="noreferrer"
            >
              SOURCE ↗
            </a>
          }
        </div>
        {header}
      </header>

      <section className={styles.section}>
        {section}
      </section>
    </main >
  );
}