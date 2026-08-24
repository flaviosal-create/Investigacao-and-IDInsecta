export const manualGeradorChaves = `Manual rápido do Gerador de Chaves

Objetivo
O Gerador de Chaves cria chaves dicotômicas no mesmo modelo visual do aplicativo: perguntas, alternativas A/B, imagens, explicações, resultado final, validação e prévia gráfica.

Fluxo recomendado
1. Abra o Gerador de chaves na tela inicial.
2. Use Importar texto se você já tiver uma chave escrita em arquivo TXT ou texto bruto copiado de outro documento.
3. Revise cada nó no Editor.
4. Adicione ou corrija imagens na aba Imagens.
5. Configure a logo opcional do pesquisador, instituição ou projeto na aba Logo.
6. Confira a Validação.
7. Veja a Prévia.
8. Na atividade de artrópodes, compare a chave criada com a proposta do aplicativo.
9. Na atividade de identificação, anexe a chave ao app quando ela for usada como nova chave de identificação.

Autoria LABSED
Toda chave gerada inclui obrigatoriamente a assinatura:
Produzido por Laboratório de Software Didático - LABSED.
A logo e autoria LABSED permanecem mesmo quando a chave também possui logo do pesquisador ou instituição interessada.

Como preparar o arquivo TXT
Use texto simples, com blocos [NODE id]. Cada alternativa deve começar com A: ou B:. Depois indique se ela leva a outro nó com NEXT: ou se encerra a chave com RESULTADO:.

Como usar texto bruto
Se o texto veio misturado com introdução, comentários, referências ou páginas de PDF, cole tudo na aba Importar texto e clique em Extrair provável chave. O gerador tentará manter apenas linhas com padrão de chave dicotômica, como alternativas numeradas, A/B, destinos e resultados. Depois revise o texto extraído antes de converter.

Modelo mínimo
TITULO: Chave para famílias de exemplo
START: n1
LOGO_NOME: Minha instituição
LOGO_URL:

[NODE n1]
TITULO: 1
PERGUNTA: Como são as antenas?

A: Antenas curtas
NEXT: n2
IMAGENS: Fig204, Fig205
EXPLICACAO: Observe o número de artículos visíveis.
DICA: Compare com o comprimento da cabeça.

B: Antenas longas
RESULTADO: NEMATOCERA
IMAGENS: Fig206
EXPLICACAO: Antenas longas costumam ter muitos artículos.

[NODE n2]
TITULO: 2(1)
PERGUNTA: Existe sulco ptilinal?

A: Sulco ausente
RESULTADO: GRUPO A

B: Sulco presente
RESULTADO: GRUPO B

Campos aceitos
TITULO: título geral da chave ou título curto do nó, dependendo da posição.
START: ID do nó inicial.
LOGO_NOME: nome da instituição ou projeto do interessado.
LOGO_URL: endereço da logo opcional do interessado.
[NODE n1]: início de um nó. Troque n1 pelo ID desejado.
PERGUNTA: pergunta exibida no nó.
A: texto da alternativa A.
B: texto da alternativa B.
NEXT: ID do próximo nó.
RESULTADO: resultado terminal.
IMAGENS: IDs de imagens separados por vírgula.
EXPLICACAO: texto didático da alternativa.
DICA: orientação curta para observação.

Cuidados
• Cada nó deve ter ID único.
• Cada alternativa deve usar NEXT ou RESULTADO.
• Todo NEXT precisa apontar para um nó existente.
• IDs de imagem precisam estar cadastrados no catálogo do app.
• Depois de importar, sempre revise a prévia e a validação.`;
