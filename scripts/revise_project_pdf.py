from pathlib import Path
from io import BytesIO

from pypdf import PdfReader, PdfWriter
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import cm
from reportlab.platypus import BaseDocTemplate, Frame, PageTemplate, Paragraph, PageBreak, Spacer, ListFlowable, ListItem

SOURCE = Path("/Users/flaviodiasvieira/Desktop/projeto.pdf")
OUTPUT = Path("output/pdf/projeto-revisado.pdf")
OUTPUT.parent.mkdir(parents=True, exist_ok=True)

styles = getSampleStyleSheet()
body = ParagraphStyle("Body", parent=styles["BodyText"], fontName="Times-Roman", fontSize=10.2, leading=13.2, alignment=TA_JUSTIFY, spaceAfter=7)
heading = ParagraphStyle("Heading", parent=styles["Heading1"], fontName="Times-Bold", fontSize=14, leading=17, textColor=colors.HexColor("#244B65"), spaceBefore=2, spaceAfter=10)
subheading = ParagraphStyle("Subheading", parent=styles["Heading2"], fontName="Times-Bold", fontSize=11.5, leading=14, textColor=colors.HexColor("#244B65"), spaceBefore=4, spaceAfter=7)
bullet = ParagraphStyle("Bullet", parent=body, leftIndent=15, firstLineIndent=-8, spaceAfter=4)
small = ParagraphStyle("Small", parent=body, fontSize=9.2, leading=11.5)

def P(text, style=body):
    return Paragraph(text, style)

def bullets(items):
    return ListFlowable([ListItem(P(item, bullet), leftIndent=12) for item in items], bulletType="bullet", start="circle", leftIndent=18)

def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(colors.HexColor("#D7E1E8"))
    canvas.line(2*cm, 1.55*cm, A4[0]-2*cm, 1.55*cm)
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(colors.HexColor("#65727A"))
    canvas.drawString(2*cm, 1.05*cm, "LABSED: Plataforma educacional integrada para identificação biológica")
    canvas.drawRightString(A4[0]-2*cm, 1.05*cm, str(doc.page + 9))
    canvas.restoreState()

def page(title, content):
    return [P(title, heading), *content]

pages = [
    page("4 METODOLOGIA", [
        P("A pesquisa será de natureza aplicada, com abordagem de métodos mistos e desenho quase-experimental, longitudinal e de medidas repetidas, organizada como pesquisa de desenvolvimento de produto educacional. O percurso combinará revisão bibliográfica, análise de requisitos, ciclos de design e programação, validação científico-pedagógica, aplicação em contexto educacional e análise de evidências de uso e aprendizagem."),
        P("A comparação empírica será realizada entre o Modo Investigativo e o Modo Chave Dicotômica do LABSED. Não se assumirá previamente que um método seja superior. O foco será caracterizar diferenças de usabilidade, autonomia, argumentação, compreensão dos caracteres e tolerância a erros de observação."),
        P("O recorte biológico será delimitado às famílias de Coleoptera contempladas no aplicativo. O percurso natural da atividade partirá do reconhecimento da ordem Coleoptera e seguirá para a chave de identificação de famílias de Coleoptera."),
        P("4.1 Etapas da pesquisa", subheading),
        bullets(["Revisão de literatura sobre ensino por investigação, identificação biológica, chaves interativas, argumentação baseada em evidências, materiais digitais e aprendizagem de Ciências.", "Análise dos fluxos existentes e definição do modelo pedagógico comum, mantendo separadas as lógicas da chave e da investigação.", "Desenvolvimento e refinamento do protocolo de Coleoptera, com caracteres observáveis, hipóteses concorrentes, regras, referências e casos de calibração.", "Validação por professores e especialistas, incluindo revisão dos caracteres, imagens, caminhos, casos representativos, ambíguos e incompletos.", "Aplicação piloto, revisão do produto, aplicação principal, análise dos dados e documentação do produto educacional."]),
    ]),
    page("4.2 Participantes, materiais e instrumentos", [
        P("Participarão estudantes de disciplinas relacionadas à Zoologia, selecionados por conveniência em instituição de ensino superior. O tamanho da amostra será definido por análise de poder estatístico e ajustado após estudo piloto. Cada participante receberá código anônimo; serão registrados nível de ensino, conhecimento prévio, experiência com identificação biológica e familiaridade com ferramentas digitais."),
        P("Será utilizado o aplicativo web LABSED, composto pela Chave Dicotômica, pelo LABSED Investigação, pelos protocolos de Insecta e Arthropoda, pelo protocolo de famílias de Coleoptera, pelos casos de calibração docente, pelos relatórios e pelos instrumentos de avaliação didática."),
        P("Os instrumentos da pesquisa incluirão: questionário de caracterização; pré-teste e pós-teste, quando aplicável; avaliação por exemplar; avaliação parcial de cada método; avaliação final comparativa; registros automáticos do aplicativo; entrevistas ou comentários abertos; e revisão de especialistas."),
        P("Os protocolos serão previamente revisados quanto à validade de conteúdo, clareza das estruturas, imagens, valores, pesos, regras, dificuldade e coerência entre evidências e hipóteses. A identificação de referência dos exemplares será definida por docente ou especialista antes da aplicação."),
        P("O aplicativo deverá preservar o mesmo código de estudo para o mesmo exemplar nos dois métodos. Assim, o exemplar EX-001 analisado na investigação deverá ser o EX-001 analisado na chave, reduzindo o risco de comparar organismos diferentes."),
        P("4.3 Variáveis", subheading),
        bullets(["Independentes: método, ordem de utilização, dificuldade, família de Coleoptera, conhecimento prévio e experiência com identificação.", "Dependentes: precisão da identificação, identificação inconclusiva, tempo, número de decisões, revisões, reinícios, confiança, autonomia, usabilidade, clareza, afinidade e percepção de aprendizagem.", "Variáveis específicas de erro: erro de observação, correção da observação, desvio do caminho, decisões adicionais, recuperação após novas evidências e necessidade de auxílio."]),
    ]),
    page("4.4 Procedimentos de comparação", [
        P("Os participantes serão distribuídos em dois grupos quanto à ordem de utilização dos métodos: Modo Investigativo seguido da Chave Dicotômica ou Chave Dicotômica seguida do Modo Investigativo. A ordem será balanceada para reduzir efeitos de aprendizagem, memória e familiarização."),
        P("Sempre que possível, os mesmos exemplares físicos ou exemplares equivalentes serão utilizados nos dois métodos. Cada participante analisará de 3 a 5 exemplares no piloto e, posteriormente, de 6 a 10 exemplares no estudo principal, distribuídos entre famílias de Coleoptera e níveis de dificuldade."),
        P("No início da atividade, o aplicativo solicitará o número planejado de exemplares. Se o participante não informar um valor, será adotado o padrão de um exemplar. Esse número definirá o marco de conclusão de cada etapa."),
        P("No Modo Investigativo, cada identificação será uma unidade independente. O estudante poderá registrar observações, acompanhar hipóteses concorrentes, revisar ou remover uma observação e encerrar aquela investigação individualmente quando considerar suficiente o conjunto de evidências. O encerramento de uma identificação não dependerá da conclusão da Chave Dicotômica."),
        P("A avaliação parcial do Modo Investigativo ocorrerá depois que o participante encerrar o último exemplar previsto para essa etapa. Na Chave Dicotômica, a avaliação parcial ocorrerá depois que o fluxo automático concluir o número de exemplares definido. A avaliação final comparativa somente será liberada após a conclusão das duas etapas."),
        P("Para preservar a dinâmica investigativa, o Modo Investigativo não fornecerá orientação discriminativa sobre onde localizar cada estrutura. Poderá apresentar nome, definição, imagem geral ou apoio visual neutro, mas a escolha das estruturas e a combinação das evidências permanecerão sob responsabilidade do estudante. A Chave Dicotômica, por sua natureza, poderá oferecer ajuda contextual em cada decisão."),
    ]),
    page("4.5 Registro de eventos e análise dos erros", [
        P("O aplicativo registrará, por participante, método, protocolo, código do exemplar e momento da atividade: características observadas, valores escolhidos, hipóteses, caminho percorrido, tempo, resultado, estado de conclusão, retornos, reinícios, solicitações de ajuda e avaliações. Os registros serão preservados como eventos, e não apenas como estado final."),
        P("No Modo Investigativo, a alteração de um valor anteriormente registrado será identificada como correção de observação. O histórico permitirá distinguir a observação inicial, a correção, a hipótese vigente antes e depois da correção e o resultado final."),
        P("Na Chave Dicotômica, serão registrados os caracteres apresentados, a alternativa escolhida, a sequência de decisões, o resultado e eventuais reinícios. O caminho realizado será comparado ao caminho esperado para o exemplar de referência."),
        P("Será considerado erro de observação o registro inicial incompatível com o caráter definido para o exemplar de referência, desde que a referência e o critério de codificação tenham sido estabelecidos previamente. Será considerada recuperação a correção ou revisão que conduza a uma identificação adequada, ou que reduza a divergência em relação ao caminho esperado."),
        P("A equipe não interpretará automaticamente todo desvio como erro conceitual. Serão diferenciados erro de visualização, interpretação alternativa plausível, desconhecimento do caráter, erro de navegação e falha técnica. Essa codificação será revisada por dois avaliadores quando possível."),
        P("O fluxo será organizado em três momentos: avaliação por exemplar, avaliação parcial de cada método e avaliação final comparativa. As respostas serão associadas ao código do participante, ao método, à fase e ao exemplar, sem tratar registros repetidos como participantes independentes."),
    ]),
    page("4.6 Tratamento e análise estatística", [
        P("Os dados serão exportados em JSON, preservando o registro completo dos eventos, e em CSV, organizado para análise estatística. O banco conterá código do participante, código pareado do exemplar, método, protocolo, família, ordem de uso, fase avaliativa, respostas, tempos, decisões, erros, correções e resultados."),
        P("Inicialmente serão calculadas frequências, médias, medianas, desvios-padrão, intervalos interquartis e intervalos de confiança. Serão verificadas duplicidades, dados ausentes, incompatibilidades entre exemplares planejados e concluídos, códigos não pareados e registros incompletos."),
        P("A consistência interna dos itens de avaliação será examinada por alfa de Cronbach ou ômega de McDonald, conforme a adequação dos dados. Para comparações pareadas poderão ser utilizados teste de Wilcoxon, teste t pareado e teste de McNemar, conforme a natureza das variáveis."),
        P("Para considerar medidas repetidas, serão ajustados modelos lineares, logísticos ou ordinais mistos, com método, ordem, dificuldade, família e conhecimento prévio como efeitos fixos e participante e exemplar como efeitos aleatórios."),
        P("A tolerância a erros será analisada por modelos logísticos mistos para identificação correta, incorreta ou inconclusiva e para recuperação após erro. Serão considerados método, tipo de erro, dificuldade, família e ordem, incluindo a interação método × erro. Também serão analisados passos adicionais, revisões, reinícios e divergência em relação ao caminho esperado."),
        P("Serão apresentados tamanhos de efeito e intervalos de confiança. A interpretação não dependerá exclusivamente da significância estatística e considerará a estrutura pareada dos dados, a quantidade de exemplares e a qualidade dos registros."),
    ]),
    page("4.7 Avaliação didática e integração dos resultados", [
        P("A avaliação da ferramenta será organizada para comparar usabilidade, afinidade, importância pedagógica, clareza, confiança, autonomia, atenção às características, relação entre evidências e conclusões e percepção de aprendizagem. A comparação não terá a finalidade de declarar um método vencedor, mas de identificar em quais situações cada método favorece diferentes aprendizagens."),
        P("A avaliação por exemplar registrará a experiência imediata, incluindo dificuldade, confiança, conclusão, necessidade de ajuda e comentário. A avaliação parcial será aplicada ao final da quantidade planejada de exemplares de cada método. A avaliação final comparativa será aplicada somente quando o participante tiver concluído a etapa investigativa e a etapa da chave."),
        P("Os comentários e entrevistas serão analisados por análise temática, com categorias como clareza, autonomia, observação, hipótese, argumentação, incerteza, feedback, erro de visualização, recuperação e percepção de aprendizagem. Os resultados qualitativos serão integrados aos indicadores quantitativos."),
        P("A interpretação da comparação considerará especialmente a seguinte questão: quando o estudante registra uma estrutura de forma equivocada, o método permite perceber, revisar e recuperar a identificação? No Modo Investigativo, será observada a contribuição das evidências combinadas e da revisão de hipóteses. Na chave, será observado o efeito do erro sobre a sequência de decisões."),
        P("A validade do produto será analisada pela triangulação entre revisão de especialistas, estabilidade técnica, observação do uso, registros de eventos, produções dos estudantes, avaliações parciais e avaliação final. O painel docente permitirá revisar dados, identificar registros incompletos e exportar o banco para análise externa."),
        P("4.8 Aspectos éticos", subheading),
        P("A pesquisa será submetida ao Comitê de Ética em Pesquisa da instituição responsável, quando aplicável. A participação será voluntária, mediante consentimento, e os dados serão registrados de forma anonimizada. Os resultados serão apresentados de forma agregada, sem identificação individual."),
    ]),
    page("5 PRODUTO, INDICADORES E LIMITAÇÕES", [
        P("O produto educacional será o LABSED, uma aplicação web responsiva e instalável, com porta de entrada comum e dois modos de trabalho epistemologicamente distintos. O modo Chave utilizará sequência e ramificação de decisões; o modo Investigação utilizará registro de observações, hipóteses concorrentes, sustentação relativa, revisão e encerramento individual."),
        P("O produto deverá incluir protocolos de Insecta e Arthropoda, com aplicação empírica delimitada às famílias de Coleoptera disponíveis; revisão docente e casos de calibração; relatórios; códigos pareados de exemplares; registro de eventos; avaliações por fase; exportação JSON e CSV; e documentação para professores e estudantes."),
        P("Indicadores de avaliação: distinção reconhecida entre os métodos; identificação do mesmo exemplar nos dois percursos; qualidade das justificativas; taxa de identificação correta; taxa de recuperação após erro; desvios e revisões; usabilidade; autonomia; necessidade de ajuda; percepção de aprendizagem; estabilidade; acessibilidade básica e viabilidade de mediação docente."),
        P("A principal limitação será a dependência da qualidade das imagens, dos protocolos e da identificação de referência. A comparação de tolerância a erros exigirá critérios prévios de codificação e revisão humana. Resultados do piloto não permitirão generalizações amplas, mas poderão aperfeiçoar o instrumento e estimar parâmetros para a aplicação principal."),
        P("Outra limitação é que a análise de erro não permitirá concluir que todo desempenho melhor decorre exclusivamente da lógica do método. Ordem, conhecimento prévio, dificuldade do exemplar, familiaridade digital e mediação docente serão considerados na análise e relatados como possíveis fontes de variação."),
        P("A documentação do produto preservará a versão do aplicativo, os protocolos, as regras, os casos de calibração, os instrumentos, o dicionário de variáveis e os procedimentos de análise, permitindo a reprodutibilidade da pesquisa e a futura utilização em tese e artigos."),
    ]),
]

buffer = BytesIO()
doc = BaseDocTemplate(str(OUTPUT), pagesize=A4, leftMargin=2*cm, rightMargin=2*cm, topMargin=1.7*cm, bottomMargin=2*cm)
frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="normal")
doc.addPageTemplates([PageTemplate(id="main", frames=frame, onPage=footer)])
story = []
for index, content in enumerate(pages):
    story.extend(content)
    if index < len(pages) - 1:
        story.append(PageBreak())
doc.build(story)

original = PdfReader(str(SOURCE))
replacement = PdfReader(str(OUTPUT))
if len(replacement.pages) != 7:
    raise SystemExit(f"esperadas 7 páginas metodológicas, obtidas {len(replacement.pages)}")
writer = PdfWriter()
for page in original.pages[:9]:
    writer.add_page(page)
for page in replacement.pages:
    writer.add_page(page)
for page in original.pages[16:]:
    writer.add_page(page)
with OUTPUT.open("wb") as stream:
    writer.write(stream)
print(OUTPUT)
