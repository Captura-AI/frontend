import { type LicensesPage } from "@/domains/licenses";
import styles from "../LicensesPage.module.css";

interface LicenseComparisonTableProps {
  content: LicensesPage;
}

export function LicenseComparisonTable({ content }: LicenseComparisonTableProps) {
  const highlightedIndex = content.tiers.findIndex((tier) => tier.highlighted);

  return (
    <div className={styles.comparisonWrap}>
      <table className={styles.comparisonTable}>
        <thead>
          <tr>
            <th scope="col">Compare</th>
            {content.tiers.map((tier, index) => (
              <th
                className={index === highlightedIndex ? styles.comparisonHighlightCol : undefined}
                key={tier.id}
                scope="col"
              >
                {tier.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {content.comparisonRows.map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              {row.values.map((value, index) => (
                <td
                  className={index === highlightedIndex ? styles.comparisonHighlightCol : undefined}
                  key={`${row.label}-${content.tiers[index]?.id ?? index}`}
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
