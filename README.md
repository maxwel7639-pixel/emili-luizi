# Emili Luizi | Fotógrafa Pet

Site institucional de uma página. HTML/CSS/JS puro, sem build, sem framework.

## Paleta e tipografia

- **Base editorial**: bege/off-white (`#F6F1EA`, `#FAF7F1`) + preto quase puro (`#0D0C0A`).
- **Accents extraídos das próprias fotos de fundo de estúdio dela** (não escolhidos a
  dedo): terracota `#B5581F` (fundo laranja do ensaio do shih tzu / rolos de papel do
  estúdio), verde escuro `#33452F` (fundo do buldogue francês / balões da formatura),
  rosa suave `#D9A392` (usado com moderação, ex. kicker da seção "Como funciona").
  Accent nunca vira base — é sempre pontual (CTA, números, kicker).
- Tipografia: **Space Grotesk** (títulos, números, marca) + **Archivo** (corpo) — sans+sans
  geométrico, editorial mas não "fofo", propositalmente diferente da dupla serifada usada
  no site da Letícia Caires (cada cliente com identidade própria).

## Fotos

Todas as 15 fotos usadas são reais, do zip enviado (`assets/originais/fotos_emili_luizi/`).
Processadas em `ferramentas/build_imagens.py` (recorte pro aspecto certo + leve ajuste de
nitidez/cor — sem tratamento artificial, sem fabricar imagem).

**Descartadas de propósito** (mesma pasta, mas fora do site):
- `mulher_2_cachorros_frase.png` — tem texto de legenda já embutido na imagem
  ("Acho chique cancelar rolê..."), post pronto pra Instagram, não serve como foto de
  portfólio limpa.
- `cafe_da_manha_pet.png` e `chaves_apartamento_novo.png` — momentos pessoais dela
  (café da manhã em família, chaves de apartamento novo) sem relação com fotografia pet.

**Não usadas, mas guardadas** (podem virar conteúdo extra depois): `portrait_parede_marrom.png`,
`portrait_claquete.png`, `portrait_tatuagem_01/02.png`, `ambiente_estudio.png` — retratos
pessoais dela e do espaço físico do estúdio, não usados pra não sobrecarregar a seção Sobre
(o briefing pedia especificamente retrato com o cachorro + colagem da janela).

## Hero com efeito de abertura no scroll

Inspirado no site do Misturini: duas fotos (cachorro em estúdio + mulher correndo com
cachorro) ficam encostadas nas bordas laterais e se afastam conforme rola a página,
"abrindo" espaço — o cartão central (retrato pessoal dela + o slogan) e os botões ficam
sempre visíveis por cima, fixos, enquanto as fotos se movem por trás. Implementado com
`position: sticky` + JS lendo a posição de scroll (`assets/js/main.js`), sem lib externa.
Em mobile a animação é desativada (só a foto da esquerda aparece, estática) e em
`prefers-reduced-motion` também não anima — ambos por CSS/JS puro.

⚠️ **Verificado só por inspeção do DOM (`getBoundingClientRect` +
`elementFromPoint`), não por print de tela**: o ambiente onde montei o site tem um bug
de renderização no Chrome headless especificamente com `position: sticky` durante scroll
programático — a página confirma estar no lugar certo (hit-test bate exatamente no
elemento esperado a cada posição de scroll testada), mas o screenshot automatizado
mostra a tela em branco nesse meio-tempo, mesmo com layout correto. Ou seja, testei a
lógica de verdade, mas não vi a animação rodar com os próprios olhos — vale seu retest
visual direto no navegador antes de aprovar.

## Estrutura das 9 seções

Hero (foto+slogan) → Selos → Sobre (+ selo do estúdio meia.) → 5 Tipos de ensaio (card com
foto de fundo real cada) → Galeria masonry (11 fotos) → Como funciona (3 passos) →
Depoimentos (placeholder, ela tem destaque "Feedbacks" no Instagram pra puxar depois) →
FAQ → CTA final + rodapé.

## Contato usado no site

- WhatsApp: `wa.me/555189078178` com mensagem pré-preenchida ("Olá! Vim pelo site e
  gostaria de agendar um ensaio.") — sem emoji, conforme pedido no briefing.
- Instagram principal: @emililuizi · Eventos: @emilibfoto_ (rodapé) · Estúdio parceiro:
  @estudiomeia_ (selo na seção Sobre).
- E-mail: emilibittencourt@gmail.com

## Pontos em aberto

- **Depoimentos**: pedir pra ela mandar print/texto do destaque "Feedbacks" do Instagram
  antes de trocar o placeholder.
- **Prazo de entrega das fotos** (FAQ): não veio no briefing, respondido de forma genérica
  ("varia com o tipo de ensaio, combinado antes de fechar") — ajustar se ela quiser um
  prazo fixo divulgado.
