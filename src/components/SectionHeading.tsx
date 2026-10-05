export default function SectionHeading({
  index,
  tag,
  title,
}: {
  index: string;
  tag: string;
  title: string;
}) {
  return (
    <div className="reveal mb-12">
      <p className="sec-tag text-neon text-xs mb-3">
        [ {index} :: {tag} ]
      </p>
      <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-100">
        {title}
        <span className="text-neon">_</span>
      </h2>
      <div className="mt-4 h-px w-24 bg-gradient-to-r from-neon to-transparent" />
    </div>
  );
}
