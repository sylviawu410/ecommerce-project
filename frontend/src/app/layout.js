import { Montserrat} from "next/font/google";
import "./globals.css";

const geistSans = Montserrat({
  subsets: ["latin"],
});


export const metadata = {
  title: "IERG4210 project",
  description: "created by Sylvia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
