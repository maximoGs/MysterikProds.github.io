// FIX: Add import for React to satisfy the TypeScript compiler.
import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';

// React is available globally from the CDN script.

type Language = 'en' | 'es' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: Record<string, any>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// FIX: Export LanguageProvider to be importable in other modules.
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const translationsMap = {
    es: {
      "header": {
        "manifesto": "Manifiesto",
        "services": "Servicios",
        "portfolio": "Portafolio",
        "gallery": "Galería",
        "team": "Equipo",
        "contact": "Contacto"
      },
      "hero": {
        "title": "Mysterik Producciones",
        "subtitle": "Canalizando la Esencia de Mendoza. Forjando Legados Globales.",
        "cta": "Iniciar Consulta"
      },
      "manifesto": {
        "title": "Nuestro Conjuro: Un Legado en Construcción",
        "description": "Nacido de un vínculo profundo e intrínseco con nuestra tierra, Mendoza, Mysterik canaliza su energía para construir valor global. Nuestra visión es establecer un nexo de clase mundial para la creatividad y la producción, arraigado en Argentina, para el mundo. No solo creamos anuncios; construimos mitologías con una conexión profunda y auténtica a un lugar de calidad mundialmente reconocida. Somos socios estratégicos en la construcción de su legado.",
        "pillar1": {
          "title": "Centro Gastronómico y Vitivinícola",
          "description": "Creamos historias visuales ricas en sensaciones para bodegas y chefs de renombre mundial, traduciendo el sabor de Mendoza a un lenguaje visual global."
        },
        "pillar2": {
          "title": "Nexo Turístico de Prestigio",
          "description": "Producimos contenido inmersivo e impresionante que muestra los paisajes de Mendoza, desde los picos de los Andes hasta los valles de viñedos, impulsando el turismo de alto valor."
        },
        "pillar3": {
          "title": "Potencia Audiovisual",
          "description": "Estamos desarrollando la infraestructura y el talento para posicionar a Mendoza como una ubicación privilegiada para producciones internacionales de cine y publicidad."
        },
        "pillar4": {
          "title": "Motor Productivo e Industrial",
          "description": "Nos asociamos con industrias locales, creando narrativas corporativas poderosas que impulsan la inversión y muestran el potencial económico de Mendoza."
        }
      },
      "services": {
        "title": "El Oráculo Creativo",
        "description": "Nuestros servicios son los arcanos a través de los cuales canalizamos nuestro poder creativo. Descubra el ritual que elevará su marca.",
        "cards": {
          "mythology": {
            "title": "Mitología de Marca",
            "description": "Creamos narrativas de marca convincentes que resuenan profundamente, transformando su negocio en un referente cultural. Nuestra narración estratégica construye una base de seguidores leales y un legado atemporal."
          },
          "alchemy": {
            "title": "Alquimia Visual",
            "description": "Nuestro diseño y producción audiovisual transmutan ideas en impresionantes experiencias visuales. Desde comerciales cinematográficos hasta contenido digital cautivador, creamos arte que exige atención."
          },
          "seership": {
            "title": "Videncia Digital",
            "description": "Navegamos las complejidades del cosmos digital, trazando un rumbo para el máximo impacto. Nuestras estrategias basadas en datos aseguran que su mensaje llegue y atraiga a su audiencia ideal."
          }
        }
      },
      "portfolio": {
        "title": "Nuestros Hechizos Forjados en Luz",
        "description": "Sea testigo de los resultados tangibles de nuestra alquimia. Cada proyecto es un testimonio de nuestro poder para moldear la percepción e inspirar la acción.",
        "items": {
          "cosmicElixir": {
            "title": "Elixir Cósmico",
            "description": "Una bebida que promete un sabor a las estrellas."
          },
          "chronoWatches": {
            "title": "Relojes Chrono",
            "description": "Relojes que son tanto un instrumento como una herencia."
          },
          "nocturneVehicles": {
            "title": "Vehículos Nocturne",
            "description": "Experimente el arte del movimiento en la oscuridad de la noche."
          }
        }
      },
      "gallery": {
        "title": "La Galería Alquímica",
        "description": "Un viaje visual curado al alma de nuestro proceso creativo y la tierra que lo inspira. Esto no es una simple colección de imágenes; es un testimonio de nuestra visión."
      },
      "team": {
        "title": "El Círculo de los Arcanos",
        "description": "Conozca a los artesanos que dirigen nuestros rituales creativos. Una baraja viviente de profesionales, cada uno un maestro en su oficio.",
        "cta": "Revelar Grimorio Personal",
        "prevAria": "Miembro anterior del equipo",
        "nextAria": "Siguiente miembro del equipo",
        "members": {
          "sofia": {
            "role": "Diseñadora",
            "title": "Diseñadora (Sede en España)",
            "bio": "Con sede en España, Sofía aporta una perspectiva global y estética refinada a cada proyecto, tendiendo puentes entre continentes a través del diseño visual.",
            "keywords": "Diseño Gráfico, Dirección de Arte, Diseño Internacional"
          },
          "augusto": {
            "role": "Desarrollador",
            "title": "Desarrollador de software",
            "bio": "Augusto transforma visiones creativas en realidades digitales robustas. Su dominio del código asegura que cada experiencia de Mysterik sea rápida, escalable e inmersiva.",
            "keywords": "Desarrollo Web, Arquitectura de Software, Innovación Digital"
          },
          "maximo": {
            "role": "CEO & Productor",
            "title": "Publicista y Productor",
            "bio": "Como corazón y fuerza motriz de Mysterik, Máximo lidera la producción y la estrategia publicitaria, orquestando equipos para forjar legados de marca con impacto real.",
            "keywords": "Producción Audiovisual, Estrategia Publicitaria, Liderazgo"
          },
          "laureano": {
            "role": "Filmmaker",
            "title": "Filmmaker y Editor",
            "bio": "La lente de Laureano captura la esencia de cada historia. Su talento para la cinematografía y la precisión en la edición dan vida a narrativas visuales que cautivan.",
            "keywords": "Cinematografía, Edición de Video, Narrativa Visual"
          },
          "magali": {
            "role": "Diseñadora Local",
            "title": "Diseñadora en Mendoza",
            "bio": "Arraigada en Mendoza, Magalí destila la energía y cultura local en diseños impactantes, asegurando que cada proyecto resuene con autenticidad y belleza.",
            "keywords": "Diseño UX/UI, Identidad Visual, Creatividad Local"
          }
        }
      },
      "news": {
        "title": "El Grimorio",
        "description": "Entradas de nuestro libro de secretos. Perspectivas, filosofías y crónicas del mundo de Mysterik.",
        "cta": "Leer Entrada",
        "posts": {
          "alchemy": {
            "title": "La Alquimia de la Viralidad",
            "excerpt": "Decodificando los patrones ocultos detrás del contenido que captura la atención del mundo."
          },
          "artDeco": {
            "title": "Art Decó en la Era Digital",
            "excerpt": "Cómo las estéticas atemporales están renaciendo en las experiencias web modernas."
          },
          "legacy": {
            "title": "Más Allá de la Campaña: Construyendo un Legado de Marca",
            "excerpt": "Nuestra filosofía sobre la creación de marketing que trasciende lo inmediato y construye valor duradero."
          }
        }
      },
      "testimonials": {
        "title": "Voces del Círculo",
        "description": "Lo que dicen quienes han experimentado nuestra alquimia creativa.",
        "items": {
          "t1": {
            "quote": "Mysterik transformó nuestra marca de bodega en una experiencia visual que resuena en todo el mundo. Su comprensión del terroir mendocino es inigualable.",
            "author": "Valentina Moretti",
            "role": "Directora de Marketing — Viñedos del Sur"
          },
          "t2": {
            "quote": "Trabajar con el equipo de Mysterik fue como ver a artesanos en acción. Cada fotograma de nuestro comercial cuenta una historia con alma.",
            "author": "Santiago Herrera",
            "role": "CEO — Grupo Andino Hotels"
          },
          "t3": {
            "quote": "No solo crearon un video; construyeron toda una mitología para nuestra marca. Las ventas y el reconocimiento se dispararon después de la campaña.",
            "author": "Camila Ríos",
            "role": "Fundadora — Estudio Nómada"
          }
        }
      },
      "contact": {
        "title": "Únase a Nuestro Círculo Íntimo",
        "description": "Inicie el ritual. Contáctenos para obtener acceso a conocimientos exclusivos y para discutir cómo nuestra alquimia puede forjar su legado.",
        "namePlaceholder": "Su Nombre",
        "emailPlaceholder": "Su Correo Electrónico",
        "messagePlaceholder": "Su Mensaje",
        "cta": "Enviar Invocación",
        "success": "¡Su invocación ha sido enviada! Nos pondremos en contacto pronto."
      },
      "scrollToTop": {
        "ariaLabel": "Volver arriba"
      },
      "footer": {
        "rights": "Todos los Ritos Reservados.",
        "tagline": "De Mendoza para el Mundo."
      },
      "whatsapp": {
        "ariaLabel": "Contáctenos en WhatsApp"
      },
      "modal": {
        "closeAria": "Cerrar modal"
      },
      "lightbox": {
        "closeAria": "Cerrar visor",
        "prevAria": "Imagen anterior",
        "nextAria": "Siguiente imagen"
      }
    },
    en: {
      "header": {
        "manifesto": "Manifesto",
        "services": "Services",
        "portfolio": "Portfolio",
        "gallery": "Gallery",
        "team": "Team",
        "contact": "Contact"
      },
      "hero": {
        "title": "Mysterik Producciones",
        "subtitle": "Channeling Mendoza's Essence. Forging Global Legacies.",
        "cta": "Begin Your Consultation"
      },
      "manifesto": {
        "title": "Our Conjuring: A Legacy in the Making",
        "description": "Born from a deep, intrinsic bond with our land, Mendoza, Mysterik channels its energy to build global value. Our vision is to establish a world-class nexus for creativity and production, rooted in Argentina, for the world. We don't just create ads; we build mythologies with a deep, authentic connection to a place of world-renowned quality. We are strategic partners in constructing your legacy.",
        "pillar1": {
          "title": "Gastronomic & Viticultural Hub",
          "description": "We craft sensory-rich visual stories for wineries and world-renowned chefs, translating the taste of Mendoza into a global visual language."
        },
        "pillar2": {
          "title": "Premier Tourism Nexus",
          "description": "We produce immersive, breathtaking content that showcases Mendoza's landscapes, from the Andes peaks to vineyard valleys, driving high-value tourism."
        },
        "pillar3": {
          "title": "Audiovisual Powerhouse",
          "description": "We are developing the infrastructure and talent to position Mendoza as a prime location for international film and advertising productions."
        },
        "pillar4": {
          "title": "Productive & Industrial Engine",
          "description": "We partner with local industries, creating powerful corporate narratives that drive investment and showcase Mendoza's economic potential."
        }
      },
      "services": {
        "title": "The Creative Oracle",
        "description": "Our services are the arcana through which we channel our creative power. Discover the ritual that will elevate your brand.",
        "cards": {
          "mythology": {
            "title": "Brand Mythology",
            "description": "We craft compelling brand narratives that resonate deeply, transforming your business into a cultural touchstone. Our strategic storytelling builds a loyal following and a timeless legacy."
          },
          "alchemy": {
            "title": "Visual Alchemy",
            "description": "Our design and audiovisual production transmutes ideas into stunning visual experiences. From cinematic commercials to captivating digital content, we create art that commands attention."
          },
          "seership": {
            "title": "Digital Seership",
            "description": "We navigate the complexities of the digital cosmos, charting a course for maximum impact. Our data-driven strategies ensure your message reaches and engages your ideal audience."
          }
        }
      },
      "portfolio": {
        "title": "Our Spells Cast in Light",
        "description": "Witness the tangible results of our alchemy. Each project is a testament to our power to shape perception and inspire action.",
        "items": {
          "cosmicElixir": {
            "title": "Cosmic Elixir",
            "description": "A beverage that promises a taste of the stars."
          },
          "chronoWatches": {
            "title": "Chrono Watches",
            "description": "Timepieces that are both an instrument and an heirloom."
          },
          "nocturneVehicles": {
            "title": "Nocturne Vehicles",
            "description": "Experience the art of motion in the dead of night."
          }
        }
      },
      "gallery": {
        "title": "The Alchemical Gallery",
        "description": "A curated visual journey into the soul of our creative process and the land that inspires it. This is not a simple collection of images; it is a testament to our vision."
      },
      "team": {
        "title": "The Circle of Arcana",
        "description": "Meet the artisans who conduct our creative rituals. A living deck of professionals, each a master of their craft.",
        "cta": "Reveal Personal Grimoire",
        "prevAria": "Previous team member",
        "nextAria": "Next team member",
        "members": {
          "sofia": {
            "role": "Designer",
            "title": "Designer (Based in Spain)",
            "bio": "Based in Spain, Sofía brings a global perspective and refined aesthetic to every project, bridging continents through visual design.",
            "keywords": "Graphic Design, Art Direction, International Design"
          },
          "augusto": {
            "role": "Developer",
            "title": "Software Developer",
            "bio": "Augusto transforms creative visions into robust digital realities. His mastery of code ensures every Mysterik experience is fast, scalable, and immersive.",
            "keywords": "Web Development, Software Architecture, Digital Innovation"
          },
          "maximo": {
            "role": "CEO & Producer",
            "title": "Publicist and Producer",
            "bio": "As the heart and driving force of Mysterik, Máximo leads production and advertising strategy, orchestrating teams to forge brand legacies with real impact.",
            "keywords": "Audiovisual Production, Advertising Strategy, Leadership"
          },
          "laureano": {
            "role": "Filmmaker",
            "title": "Filmmaker and Editor",
            "bio": "Laureano's lens captures the essence of every story. His talent for cinematography and precision in editing bring visual narratives to life that captivate audiences.",
            "keywords": "Cinematography, Video Editing, Visual Narrative"
          },
          "magali": {
            "role": "Local Designer",
            "title": "Designer in Mendoza",
            "bio": "Rooted in Mendoza, Magalí distills local energy and culture into striking designs, ensuring each project resonates with authenticity and beauty.",
            "keywords": "UX/UI Design, Visual Identity, Local Creativity"
          }
        }
      },
      "news": {
        "title": "The Grimoire",
        "description": "Entries from our book of secrets. Insights, philosophies, and chronicles from the world of Mysterik.",
        "cta": "Read Entry",
        "posts": {
          "alchemy": {
            "title": "The Alchemy of Virality",
            "excerpt": "Decoding the hidden patterns behind content that captures the world's attention."
          },
          "artDeco": {
            "title": "Art Deco in the Digital Age",
            "excerpt": "How timeless aesthetics are being reborn in modern web experiences."
          },
          "legacy": {
            "title": "Beyond the Campaign: Building a Brand Legacy",
            "excerpt": "Our philosophy on creating marketing that transcends the immediate and builds lasting value."
          }
        }
      },
      "testimonials": {
        "title": "Voices of the Circle",
        "description": "What those who have experienced our creative alchemy have to say.",
        "items": {
          "t1": {
            "quote": "Mysterik transformed our winery brand into a visual experience that resonates worldwide. Their understanding of Mendoza's terroir is unmatched.",
            "author": "Valentina Moretti",
            "role": "Marketing Director — Viñedos del Sur"
          },
          "t2": {
            "quote": "Working with the Mysterik team was like watching artisans at work. Every frame of our commercial tells a story with soul.",
            "author": "Santiago Herrera",
            "role": "CEO — Grupo Andino Hotels"
          },
          "t3": {
            "quote": "They didn't just create a video; they built an entire mythology for our brand. Sales and recognition skyrocketed after the campaign.",
            "author": "Camila Ríos",
            "role": "Founder — Estudio Nómada"
          }
        }
      },
      "contact": {
        "title": "Join Our Inner Circle",
        "description": "Begin the ritual. Contact us to gain access to exclusive insights and to discuss how our alchemy can forge your legacy.",
        "namePlaceholder": "Your Name",
        "emailPlaceholder": "Your Email",
        "messagePlaceholder": "Your Message",
        "cta": "Send Invocation",
        "success": "Your invocation has been sent! We will be in touch soon."
      },
      "scrollToTop": {
        "ariaLabel": "Scroll to top"
      },
      "footer": {
        "rights": "All Rites Reserved.",
        "tagline": "From Mendoza to the World."
      },
      "whatsapp": {
        "ariaLabel": "Contact us on WhatsApp"
      },
      "modal": {
        "closeAria": "Close modal"
      },
      "lightbox": {
        "closeAria": "Close viewer",
        "prevAria": "Previous image",
        "nextAria": "Next image"
      }
    },
    pt: {
      "header": {
        "manifesto": "Manifesto",
        "services": "Serviços",
        "portfolio": "Portfólio",
        "gallery": "Galeria",
        "team": "Equipe",
        "contact": "Contato"
      },
      "hero": {
        "title": "Mysterik Produções",
        "subtitle": "Canalizando a Essência de Mendoza. Forjando Legados Globais.",
        "cta": "Iniciar Consulta"
      },
      "manifesto": {
        "title": "Nossa Evocação: Um Legado em Formação",
        "description": "Nascida de um vínculo profundo e intrínseco com nossa terra, Mendoza, a Mysterik canaliza sua energia para construir valor global. Nossa visão é estabelecer um nexo de classe mundial para la criatividade e produção, enraizado na Argentina, para o mundo. Não criamos apenas anúncios; construímos mitologias com uma conexão profunda e autêntica a um lugar de qualidade mundialmente reconhecida. Somos parceiros estratégicos na construção do seu legado.",
        "pillar1": {
          "title": "Centro Gastronômico e Vitivinícola",
          "description": "Criamos histórias visuais ricas em sensações para vinícolas e chefs de renome mundial, traduzindo o sabor de Mendoza para uma linguagem visual global."
        },
        "pillar2": {
          "title": "Nexo de Turismo Premium",
          "description": "Produzimos conteúdo imersivo e deslumbrante que exibe as paisagens de Mendoza, dos picos dos Andes aos vales dos vinhedos, impulsionando o turismo de alto valor."
        },
        "pillar3": {
          "title": "Potência Audiovisual",
          "description": "Estamos desenvolvendo a infraestrutura e o talento para posicionar Mendoza como um local de primeira linha para produções internacionais de cinema e publicidade."
        },
        "pillar4": {
          "title": "Motor Produtivo e Industrial",
          "description": "Fazemos parceria com indústrias locais, criando narrativas corporativas poderosas que impulsionam o investimento e mostram o potencial econômico de Mendoza."
        }
      },
      "services": {
        "title": "O Oráculo Criativo",
        "description": "Nossos serviços são os arcanos através dos quais canalizamos nosso poder criativo. Descubra o ritual que elevará sua marca.",
        "cards": {
          "mythology": {
            "title": "Mitologia da Marca",
            "description": "Criamos narrativas de marca convincentes que ressoam profundamente, transformando seu negócio em um marco cultural. Nossa narração estratégica constrói uma base de seguidores leais e um legado atemporal."
          },
          "alchemy": {
            "title": "Alquimia Visual",
            "description": "Nosso design e produção audiovisual transmutam ideias em experiências visuais deslumbrantes. De comerciais cinematográficos a conteúdo digital cativante, criamos arte que exige atenção."
          },
          "seership": {
            "title": "Clarividência Digital",
            "description": "Navegamos pelas complexidades do cosmos digital, traçando um curso para o máximo impacto. Nossas estratégias baseadas em dados garantem que sua mensagem alcance e envolva seu público ideal."
          }
        }
      },
      "portfolio": {
        "title": "Nossos Feitiços Lançados em Luz",
        "description": "Testemunhe os resultados tangíveis de nossa alquimia. Cada projeto é um testemunho de nosso poder de moldar a percepção e inspirar a ação.",
        "items": {
          "cosmicElixir": {
            "title": "Elixir Cósmico",
            "description": "Uma bebida que promete um gostinho das estrelas."
          },
          "chronoWatches": {
            "title": "Relógios Chrono",
            "description": "Relógios que são tanto um instrumento quanto uma herança."
          },
          "nocturneVehicles": {
            "title": "Veículos Nocturne",
            "description": "Experimente a arte do movimento no silêncio da noite."
          }
        }
      },
      "gallery": {
        "title": "A Galeria Alquímica",
        "description": "Uma jornada visual curada na alma do nosso processo criativo e da terra que o inspira. Esta não é uma simples coleção de imagens; é um testemunho da nossa visão."
      },
      "team": {
        "title": "O Círculo dos Arcanos",
        "description": "Conheça os artesãos que conduzem nossos rituais criativos. Um baralho vivo de profissionais, cada um mestre em sua arte.",
        "cta": "Revelar Grimório Pessoal",
        "prevAria": "Membro anterior da equipe",
        "nextAria": "Próximo membro da equipe",
        "members": {
          "sofia": {
            "role": "Designer",
            "title": "Designer (Sediada em Espanha)",
            "bio": "Sediada na Espanha, Sofía traz uma perspectiva global e estética refinada a cada projeto, construindo pontes entre continentes através do design visual.",
            "keywords": "Design Gráfico, Direção de Arte, Design Internacional"
          },
          "augusto": {
            "role": "Desenvolvedor",
            "title": "Desenvolvedor de Software",
            "bio": "Augusto transforma visões criativas em realidades digitais robustas. Seu domínio do código garante que cada experiência seja rápida, escalável e imersiva.",
            "keywords": "Desenvolvimento Web, Arquitetura de Software, Inovação Digital"
          },
          "maximo": {
            "role": "CEO e Produtor",
            "title": "Publicitário e Produtor",
            "bio": "Como coração e força motriz da Mysterik, Máximo lidera a produção e a estratégia publicitária, orquestrando equipes para forjar legados de marca com impacto real.",
            "keywords": "Produção Audiovisual, Estratégia Publicitária, Liderança"
          },
          "laureano": {
            "role": "Filmmaker",
            "title": "Cineasta e Editor",
            "bio": "A lente de Laureano captura a essência de cada história. Seu talento para a cinematografia e a precisão na edição dão vida a narrativas visuais que cativam.",
            "keywords": "Cinematografia, Edição de Vídeo, Narrativa Visual"
          },
          "magali": {
            "role": "Designer Local",
            "title": "Designer em Mendoza",
            "bio": "Enraizada em Mendoza, Magalí destila a energia e cultura local em designs impactantes, garantindo que cada projeto ressoe com autenticidade e beleza.",
            "keywords": "Design UX/UI, Identidade Visual, Criatividade Local"
          }
        }
      },
      "news": {
        "title": "O Grimório",
        "description": "Entradas do nosso livro de segredos. Percepções, filosofias e crônicas do mundo da Mysterik.",
        "cta": "Ler Entrada",
        "posts": {
          "alchemy": {
            "title": "A Alquimia da Viralidade",
            "excerpt": "Decodificando os padrões ocultos por trás do conteúdo que captura a atenção do mundo."
          },
          "artDeco": {
            "title": "Art Déco na Era Digital",
            "excerpt": "Como estéticas atemporais estão renascendo em experiências web modernas."
          },
          "legacy": {
            "title": "Além da Campanha: Construindo um Legado de Marca",
            "excerpt": "Nossa filosofia sobre a criação de marketing que transcende o imediato e constrói valor duradouro."
          }
        }
      },
      "testimonials": {
        "title": "Vozes do Círculo",
        "description": "O que dizem aqueles que experimentaram nossa alquimia criativa.",
        "items": {
          "t1": {
            "quote": "A Mysterik transformou nossa marca de vinícola em uma experiência visual que ressoa no mundo todo. Sua compreensão do terroir mendocino é incomparável.",
            "author": "Valentina Moretti",
            "role": "Diretora de Marketing — Viñedos del Sur"
          },
          "t2": {
            "quote": "Trabalhar com a equipe da Mysterik foi como ver artesãos em ação. Cada quadro do nosso comercial conta uma história com alma.",
            "author": "Santiago Herrera",
            "role": "CEO — Grupo Andino Hotels"
          },
          "t3": {
            "quote": "Eles não apenas criaram um vídeo; construíram toda uma mitologia para nossa marca. As vendas e o reconhecimento dispararam após a campanha.",
            "author": "Camila Ríos",
            "role": "Fundadora — Estudio Nómada"
          }
        }
      },
      "contact": {
        "title": "Junte-se ao Nosso Círculo Interno",
        "description": "Inicie o ritual. Entre em contato para obter acesso a informações exclusivas e para discutir como nossa alquimia pode forjar seu legado.",
        "namePlaceholder": "Seu Nome",
        "emailPlaceholder": "Seu Email",
        "messagePlaceholder": "Sua Mensagem",
        "cta": "Enviar Invocação",
        "success": "Sua invocação foi enviada! Entraremos em contato em breve."
      },
      "scrollToTop": {
        "ariaLabel": "Voltar ao topo"
      },
      "footer": {
        "rights": "Todos os Ritos Reservados.",
        "tagline": "De Mendoza para o Mundo."
      },
      "whatsapp": {
        "ariaLabel": "Contate-nos no WhatsApp"
      },
      "modal": {
        "closeAria": "Fechar modal"
      },
      "lightbox": {
        "closeAria": "Fechar visualizador",
        "prevAria": "Imagem anterior",
        "nextAria": "Próxima imagem"
      }
    }
  };
  const [language, setLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'es' || browserLang === 'pt') {
      setLanguage(browserLang as Language);
    } else {
      setIsLoading(false); // If default is 'en', no need to fetch initially
    }
  }, []);

  useEffect(() => {
    const fetchTranslations = async () => {
      setIsLoading(true);
      const data = translationsMap[language]
      setTranslations(data);
    };

    fetchTranslations();
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    translations,
  }), [language, translations]);

  // Render nothing until the initial translations are loaded to prevent showing placeholder keys
  if (isLoading && Object.keys(translations).length === 0) {
    return null;
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// FIX: Export useLanguage hook to be importable in other modules.
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};