export default function Footer() {
  return (
    <footer className="py-6 mt-12">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Diwali Delights. Happy Diwali!
        </p>
      </div>
    </footer>
  );
}
