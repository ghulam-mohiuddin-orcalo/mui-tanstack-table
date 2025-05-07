import styles from "./page.module.css";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box>
      <h1 className={styles.title}>Welcome to Toolpad</h1>
      <p className={styles.description}>
        Get started by editing&nbsp;
        <code className={styles.code}>src/app/page.tsx</code>
      </p>
    </Box>
  );
}
