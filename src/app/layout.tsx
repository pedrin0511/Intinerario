
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
            <div className="container_children">
              <FormProvider>
              {children}
            </FormProvider>
            </div>
              <img className="assinatura" src="/img/button.png" alt="Ícone ilustrativo" />
          </main>
        </div>
      </body>
    </html>
  );
}
