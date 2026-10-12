export default function Loading() {
  return (
    <div className="min-h-[60vh] bg-background flex items-center justify-center p-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="relative w-12 h-12">
          <div className="w-12 h-12 rounded-full border-4 border-muted border-t-[#ff5500] animate-spin" />
        </div>
        <div>
          <span className="text-xs font-heading font-black text-foreground uppercase tracking-widest block">
            PITS 2027
          </span>
          <span className="text-[11px] text-muted-foreground mt-0.5">
            Loading civic data...
          </span>
        </div>
      </div>
    </div>
  );
}
