const Footer = () => {
  return (
    <footer className="border-t border-border py-8">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm font-display">
          <span className="text-gradient font-bold">220</span>
          <span className="text-foreground font-bold">.work</span>
          <span className="text-muted-foreground ml-2">· Passaic County, NJ</span>
        </p>
        <div className="flex gap-6">
          <a href="https://220ventures.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            220Ventures
          </a>
          <a href="mailto:admin@vryfid.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </a>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} 220.work. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
