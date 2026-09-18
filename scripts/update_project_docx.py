from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
from xml.sax.saxutils import escape
import tempfile
import re

source = Path("docs/material-e-metodos-projeto-doutorado.docx")
updated = source.with_name("material-e-metodos-projeto-doutorado-atualizado.docx")

def paragraph(text, heading=False):
    size = "28" if heading else "22"
    heading_props = '<w:b/><w:color w:val="2E6FE0"/>' if heading else ""
    return (
        '<w:p><w:pPr></w:pPr><w:r><w:rPr>'
        f'<w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/>'
        f'<w:sz w:val="{size}"/><w:sz-cs w:val="{size}"/>{heading_props}'
        f'</w:rPr><w:t xml:space="preserve">{escape(text)}</w:t></w:r></w:p>'
    )

insert = "".join([
    paragraph("Controle de erros de observação e comparação entre métodos", heading=True),
    paragraph("Os participantes analisarão exemplares pertencentes às famílias de Coleoptera contempladas no aplicativo. O percurso partirá da identificação da ordem Coleoptera e seguirá para a chave de famílias de Coleoptera."),
    paragraph("Será investigado como erros na observação ou interpretação de estruturas morfológicas influenciam o desempenho em cada método. No Modo Investigativo, será avaliado se a combinação de diferentes evidências permite recuperar uma hipótese adequada após uma observação equivocada. Na Chave Dicotômica, será analisado se o erro em um caráter altera o caminho de decisões e conduz a uma identificação diferente ou inconclusiva."),
    paragraph("Serão registrados erro de observação, desvio no caminho, identificação correta, incorreta ou inconclusiva, recuperação após novas evidências, decisões adicionais, revisões, reinícios e necessidade de auxílio. A identificação de referência será definida previamente por docente ou especialista."),
    paragraph("Organização da avaliação no aplicativo", heading=True),
    paragraph("No início da atividade, o aplicativo solicitará o número planejado de exemplares; quando não informado, será utilizado o padrão de um exemplar. Cada identificação do Modo Investigativo será encerrada individualmente pelo participante. A avaliação parcial desse método ocorrerá após o encerramento do último exemplar previsto."),
    paragraph("Na Chave Dicotômica, a avaliação parcial ocorrerá após a conclusão automática do número de exemplares definido. A avaliação final comparativa será apresentada somente depois da conclusão das duas etapas, com itens de usabilidade, afinidade, importância pedagógica, confiança, autonomia, apoio à observação e recuperação diante de erros."),
    paragraph("O sistema não bloqueará o encerramento individual de uma investigação. Ele bloqueará apenas a avaliação final comparativa antes que os dois métodos tenham concluído suas respectivas etapas. Essa separação preserva a unidade de análise de cada identificação."),
    paragraph("Tratamento específico dos erros", heading=True),
    paragraph("A análise quantitativa incluirá modelos logísticos mistos para identificação correta, incorreta ou inconclusiva e para recuperação após erro. Serão considerados método, tipo de erro, dificuldade, família de Coleoptera e ordem de utilização, incluindo a interação método × erro. Também serão analisados passos adicionais, revisões, reinícios e divergência em relação ao caminho esperado, com tamanhos de efeito e intervalos de confiança."),
])

with ZipFile(source, "r") as zin:
    document = zin.read("word/document.xml").decode("utf-8")
    marker = '<w:t xml:space="preserve">Aspectos éticos</w:t>'
    if marker not in document:
        raise SystemExit("marcador da seção Aspectos éticos não encontrado")
    # Remove a inserção anterior, caso o arquivo já tenha sido processado, e
    # insere os novos parágrafos antes do parágrafo completo do título.
    document = document.replace(insert + marker, marker, 1)
    paragraph_match = re.search(r'<w:p>.*?' + re.escape(marker) + r'.*?</w:p>', document, re.DOTALL)
    if not paragraph_match:
        raise SystemExit("parágrafo da seção Aspectos éticos não encontrado")
    existing_paragraph = paragraph_match.group(0)
    document = document.replace(existing_paragraph, insert + existing_paragraph, 1)
    with ZipFile(updated, "w", ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            data = document.encode("utf-8") if item.filename == "word/document.xml" else zin.read(item.filename)
            zout.writestr(item, data)

source.unlink()
updated.rename(source)
print(source)
