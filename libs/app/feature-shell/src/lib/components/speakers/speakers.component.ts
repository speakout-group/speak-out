import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SpeakerComponent, SpeakerData } from '../speaker/speaker.component';

@Component({
  selector: 'shell-speakers',
  templateUrl: './speakers.component.html',
  styleUrls: ['./speakers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpeakersComponent {
  speakers = [
    { photo: 'assets/palestrantes/galvao.jpg', title: 'APIs do jeito certo*', description: 'APIs HTTP são a mais nova e quente tendência de mercado. Nesta palestra explico os motivos pelos quais o mercado está migrando massivamente para esta tendência e detalho as melhores práticas, conceitos e ferramentas para que você e sua empresa começem a trabalhar com isso do jeito certo e sem dores de cabeça.APIs do jeito certo*', name: 'Galvão', bio: 'Engenheiro de Software Sênior na UOL EdTech; \n Presidente da ABRAPHP – Associação Brasileira de Profissionais PHP; \n Diretor da ConFLOSS e da PHP Conference Brasil; \n Evangelista e Contribuidor para a Linguagem PHP; \n Evangelista Laminas Project; \n Embaixador Fedora LATAM; \n Professor Convidado (Especialista) de Pós-Graduação (PR e SC); \n 25+ anos desenvolvendo sistemas com interface web sendo mais de 20 destes com PHP e mais de 12 com Zend Framework / Laminas Project; \n Palestrante em eventos nacionais e internacionais; \n Professor de cursos presenciais e a distância.' },
    { photo: 'assets/palestrantes/vinicius-sanger.jpg', title: 'Internet das Coisas e Inteligência Artificial na prática', description: 'Nesta programação, Vini Senger apresentará dispositivos reais que utilizam Internet das Coisas e Inteligência Artificial, para que possamos observar a aplicação das tecnologias. Tudo que será apresentado por Vini já foi usado pela Amazon Web Services para desenvolver geladeiras inteligentes, carros conectados, robôs e muito mais.', name: 'Vinicius Senger', bio: 'Senior Developer Advocate na Amazon Web Services' },
    { photo: 'assets/palestrantes/padro-mazala.jpg', title: 'Observabilidade - dê-me visão além do alcance', description: 'Observabilidade vem do latim observabilis… Brincadeira, esse não é esse tipo de talk. O objetivo aqui será discutir padrões de observabilidade e como essa palavra (um tanto quanto extensa) pode ajudar seu time a escalar aplicações e seguir para o caminho de múltiplos serviços.', name: 'Pedro Mazala', bio: 'desenvolvedor há 10+ anos atualmente atuando como Principal Software Engineer na Payaut. De Cataguases para Maringá e para o mundo. Ultimamente ajudo empresas a dar o próximo passo em relação ao aprimoramento de arquitetura e processos de desenvolvimento. Moro nos Países Baixos (que a maioria das pessoas chama de Holanda) há dois anos. Nas horas vagas gosto de fingir que sei treinar Jiu-Jitsu e tomar vários tipos de cafés.' },
    {
      photo: 'assets/palestrantes/otavio-e-karina.jpg',
      title: 'As cinco Hard skills que você precisa dominar para ter destaque no meio técnico',
      description: 'A área da tecnologia vem crescendo de modo exponencial e trazendo consigo diversas oportunidades e especializações. Dentro dessas milhares de opções, temos a engenharia e arquitetura de software. Porém, com tantos conteúdos e fácil acesso a informação, como saber qual seria o melhor caminho para chegar ao objetivo que nos trará a almejada felicidade?',
      name: 'Otavio Santana, Karina Varela'
    },
    { photo: 'assets/palestrantes/ana-medrado.jpg', title: 'Idealização, planejamento e prototipação, o que vem antes das linhas de código?', description: 'A tecnologia evoluiu e seu processo de desenvolvimento também. Vamos falar sobre as etapas do processo de desenvolvimento e como sua execução influencia diretamente na produtividade e na entrega de valor feita ao final do projeto.', name: 'Ana Medrado', bio: 'Apaixonada por tecnologia e arte. Um misto de design com linhas de código, bacharel em sistemas de informação, product designer na Arena.im e maker nas horas vagas.' },
    { photo: 'assets/palestrantes/ruben-marcus.jpg', title: 'Escalando projetos com React e TS ', description: 'Porque usar? Quais as vantagens? Porque se tornou padrão de mercado? Nessa palestra vamos abordar como TypeScript evoluiu com o tempo e como a adoção dele no React virou um padrão no mercado, quais as vantagens e desvantagens de se usar TS, alguns casos de uso, conceitos mais avançados, últimas novidades', name: 'Ruben Marcus', bio: 'Ruben é um dev apaixonado por engenharia de software, UX/UI e código voltado a performance e escalabilidade. Com 10 anos de experiência, atualmente trabalha na Grover com React e Next.js,uma startup alemã que vem revolucionando o uso de eletrônicos permitido que as pessoas possam alugar eletrônicos que antes compravam. Também já atuou em diversas empresas como Zup, Centauro , Printi, e freelancer prestando serviços para clientes como Santander, Itaú, Panasonic, Samsung, Monsanto, Estadão, etc.  https://www.linkedin.com/in/rubenmarcus/' },
    {
      photo: 'assets/palestrantes/juliano-ribeiro.jpg',
      title: 'A carreira do Coach Kanban, o início, o fim e o meio',
      description: 'Nessa talk vou contar um pouco para você de como iniciar na carreira de Kanban Coach, os desafios iniciais, as boas referências, como superar as dificuldades e especialmente as heurísticas que nos levam muito além da agilidade.',
      name: 'Juliano Ribeiro',
      bio: 'Juliano Ribeiro, AKT, AKC - Accredited Kanban Trainer, Accredited Kanban Consultant, Certified Scrum Professional (CSP-SM&PO/ScrumAlliance), Certified Scrum Developer (CSD/ScrumAlliance), Tecnólogo em Sistemas para a Internet e Especialista em Programação Orientada à Objetos (UNICESUMAR). Trabalha com desenvolvimento de software desde 1994 e palestra no Brasil e no Exterior em eventos como Scrum Gathering, Agile Brazil, The Developer’s Conference, Agile Tour, Saturn e XP Conference. https://www.linkedin.com/in/julianopauloribeiro/'
    },
    { photo: 'assets/palestrantes/kleber-reis.jpg', title: 'Introdução ao API Gateway - KONG', description: 'Descrição: Durante a aprensetação da iremos efetuar a instalação do KONG, criação de rotas para alguns serviços e instalação dos plugins disponíveis no KONG: Rate Limit; Proxy cache; Basic Authentication; JWT.', name: 'Kleber de Andrade Reis', bio: 'Software Engineering na OLX. Vinte anos de experiência profissional na área de tecnologia. Experiência em sistemas de monitoramento e a produção de energia elétrica, sistemas de ensino a distância, criptografia, certificação digital, sistemas financeiros (empréstimos, garantias, internet bank e institucional), sistemas de varejo (venda, pós-venda, logística, backoffice) e telecom (OMS, URA, Catalogo Corporativo, CPQ, Billing, Charging). Entusiasta de Cloud Computing e desenvolvimento de software no geral.' },
    {
      photo: 'assets/palestrantes/juliana-e-tatiana.jpg',
      title: 'O que aprendemos construindo nosso data lake',
      description: 'Vamos abordar com uma apresentação de slides a nossa experiência ao construir um data lake, falando sobre tecnologias, frameworks, serviços e boas práticas que adotamos e que acreditamos tenham facilitado nossa jornada.',
      name: 'Juliana Strieder Philippsen e Tatiana Mara',
      bio: 'Tatiana Mara: Sou uma engenheira de dados na Rock Content, tenho 4 anos de experiência trabalhando com análise e engenharia de dados. No meu tempo livre gosto de assistir séries e jogos da NBA. Juliana Strieder Philippsen é engenheira de dados na Rock Content. Trabalha com ciência de dados e engenharia de dados desde 2018, quando fez uma transição de carreira da academia para a tecnologia. Em seu tempo livre, curte ler livros, viajar e praticar yoga.'
    },
    {
      photo: 'assets/palestrantes/adriano-santos.jpg',
      title: 'Construindo API REST em poucos minutos com Delphi, Horse e Boss',
      description: 'Nessa palestra, Adriano Santos, irá demonstrar como é possível construir API REST usando o framework minimalista Horse e o gerenciador de dependências Boss.',
      name: 'Adriano Santos',
      bio: 'Adriano Santos é membro sênior do programa Embarcadero MVP, especialista em desenvolvimento de software e Aplicativos Mobile, uma das maiores referências Delphi do país. CEO da empresa Adriano Santos Treinamentos e já atuou como editor chefe da Revista ClubeDelphi e Consultor Sênior na Embarcadero.'
    },
    {
      photo: 'assets/palestrantes/luan-mileski.jpg',
      title: 'PO e Dev - Um relacionamento de amor e ódio. Como melhorá-lo sem precisar de terapia de casal.',
      description: 'Tá aí um dos relacionamentos mais complicados do meio de desenvolvimento de software não é ? Nesta palestra irei trazer algumas dicas, ferramentas e táticas para fortalecer esse relacionamento e ambos de fato sentirem-se parte de um mesmo time.',
      name: 'Luan Mileski'
    },
  ]

  constructor(private dialog: MatDialog) { }

  open(data: SpeakerData) {
    this.dialog.open(SpeakerComponent, { data, maxWidth: '600px' })
  }
}
