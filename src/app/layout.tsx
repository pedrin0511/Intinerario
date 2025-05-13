
import { FormProvider } from "@/context/FormContext";
import "./globals.css";


export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
  <body>
    <div className="layout">
      <header>
        <h1>Formulario Itinerario</h1>
      </header>
      <main>
        <FormProvider>
          {children}
        </FormProvider>
        <div className="image-container">
          <img src="https://cdn-icons-gif.flaticon.com/15557/15557693.gif" alt="Ícone ilustrativo" />
        </div>
      </main>
    </div>
  </body>
</html>
  );
}
