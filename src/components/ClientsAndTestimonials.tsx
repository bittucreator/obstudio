import Image from 'next/image';

interface Client {
  id: string;
  name: string;
  logoUrl?: string | null;
}

interface Props {
  clients: Client[];
}

export default function ClientsAndTestimonials({ clients }: Props) {
  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          {/* Clients */}
          <p className="text-xs text-gray-400 tracking-wider mb-8">CLIENTS</p>
          <div className="flex flex-wrap justify-center gap-8">
            {clients.map((client) => (
              <div 
                key={client.id}
                className="flex flex-col items-center"
              >
                <div className="relative w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-2 overflow-hidden">
                  {client.logoUrl ? (
                    <Image 
                      src={client.logoUrl} 
                      alt={client.name} 
                      fill
                      className="object-contain p-1"
                    />
                  ) : (
                    <span className="text-xs font-medium text-gray-600">
                      {client.name.substring(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-500">{client.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
