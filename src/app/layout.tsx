
import { FormProvider } from "@/context/FormContext";
import "./globals.css";


export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body>
        <div className="layout">
          <header>
            <img className="img" src="/img/head.png" alt="" />
          </header>
          <main>
            <FormProvider>
              {children}
            </FormProvider>
            <div className="image-container">
              <img className="img" src="/img/button.png" alt="Ícone ilustrativo" />
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
