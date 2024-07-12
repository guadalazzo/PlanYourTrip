export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <h1>Plan your trip!</h1>
      </header>
      <main>{children}</main>
    </>
  );
}
