
export type ChatAttachment = {
  url: string;
  publicId: string;
  resourceType: string;
  originalName: string;
};

type UserProps = {
  text: string;
  attachments?: ChatAttachment[];
};

export default function User({ text, attachments = [] }: UserProps) {
  return (
    <div className="w-full md:w-80% rounded-2xl border border-white/10 bg-white/10 p-4 text-white backdrop-blur-md">
      <p className="whitespace-pre-wrap break-words text-sm sm:text-base">
        {text}
      </p>

      {attachments.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {attachments.map((file, index) => {
            const isImage = file.resourceType === "image";

            if (isImage) {
              return (
                <a
                  key={index}
                  href={file.url}
                  target="_blank"
                  rel="noreferrer"
                  className="overflow-hidden rounded-xl border border-white/10 bg-black/20"
                >
                  <img
                    src={file.url}
                    alt={file.originalName}
                    className="h-28 w-28 object-cover sm:h-32 sm:w-32"
                  />
                </a>
              );
            }

            return (
              <a
                key={index}
                href={file.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white hover:bg-white/10"
              >
                {file.originalName}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}