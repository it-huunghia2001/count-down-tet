import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

// Font cho nội dung: Hiện đại, dễ đọc
const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

// Font cho tiêu đề: Sang trọng, cổ điển
const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  openGraph: {
    title: "Đếm ngược Tết",
    description: "Cùng đếm ngược Tết Nguyên Đán 🎉",
    images: [
      {
        url: "/logo-profile.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

// export const metadata: Metadata = {
//   title: "Tết Bính Ngọ 2026 | Countdown Luxury",
//   description: "Chào mừng năm mới Bính Ngọ với những lời chúc tốt đẹp nhất",
//   icons: {
//     icon: "/logo-profile.png",
//     shortcut: "/logo-profile.png",
//     apple: "/logo-profile.png",
//   },
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
