import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import AOSWrapper from "@/components/ui/AosWrapper";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800']
});

export const metadata: Metadata = {
  title: "Veterinary Medicines & Animal Health | VetPaw",
  description: "Trusted veterinary medicines for healthier animals. Safe, effective, and innovative solutions for vets, farmers, and pet owners.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  try {
                    const theme = localStorage.getItem('theme-storage');
                    if (theme) {
                      const value = JSON.parse(theme).state?.theme;
                      if (value === 'dark') {
                        document.documentElement.classList.add('dark');
                      }
                    }
                  } catch (e) {}
                })();
              `,
            }}
          />
        </>
      </head>
      <body className={`${poppins.variable} font-poppins scroll-smooth`}>
        <AOSWrapper>
          {children}
        </AOSWrapper>
      </body>
    </html >
  );
}
