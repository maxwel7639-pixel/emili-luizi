# -*- coding: utf-8 -*-
"""
Pipeline de imagem para o site da Emili Luizi (fotografa pet).
Todas as fotos sao reais, do portfolio dela -- so redimensiona, ajusta nitidez
e corta pro aspecto certo de cada uso (hero, card, sobre, galeria).
"""
import os
from PIL import Image, ImageFilter, ImageEnhance, ImageOps

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ORIGEM = os.path.join(RAIZ, "assets", "originais", "fotos_emili_luizi")
SAIDA = os.path.join(RAIZ, "assets", "img")
os.makedirs(SAIDA, exist_ok=True)


def afiar(im, fator_upscale):
    if fator_upscale > 1.15:
        im = im.filter(ImageFilter.GaussianBlur(0.4))
    raio = max(1.0, 1.4 * fator_upscale)
    return im.filter(ImageFilter.UnsharpMask(radius=raio, percent=125, threshold=2))


def preparar(nome_origem, saida, largura, altura, foco=(0.5, 0.32), qualidade=88):
    im = Image.open(os.path.join(ORIGEM, nome_origem)).convert("RGB")
    fator = max(largura / im.width, altura / im.height)
    recorte = ImageOps.fit(im, (largura, altura), method=Image.LANCZOS, centering=foco)
    recorte = ImageEnhance.Contrast(recorte).enhance(1.03)
    recorte = ImageEnhance.Color(recorte).enhance(1.04)
    recorte = afiar(recorte, fator)
    recorte.save(os.path.join(SAIDA, f"{saida}.jpg"), "JPEG", quality=qualidade, subsampling=0)
    recorte.save(os.path.join(SAIDA, f"{saida}.webp"), "WEBP", quality=qualidade - 2)
    print(f"{saida}: {recorte.size} (fator {fator:.2f}) ok")


if __name__ == "__main__":
    # ---- HERO (split, duas imagens) ----
    preparar("cachorro_closeup.png", "hero-esquerda", 1100, 1750, foco=(0.55, 0.28))
    preparar("mulher_correndo_cachorro.png", "hero-direita", 1100, 1750, foco=(0.5, 0.35))

    # ---- SOBRE ----
    preparar("portrait_com_cachorro.png", "sobre-principal", 900, 1050, foco=(0.5, 0.25))
    preparar("portrait_colagem_janela.png", "sobre-colagem", 900, 1150, foco=(0.5, 0.4))
    preparar("logo_estudio_meia.png", "logo-estudio", 560, 714, foco=(0.5, 0.35))

    # ---- CARDS: TIPOS DE ENSAIO ----
    preparar("buldogue_frances.png", "card-individual", 900, 1125, foco=(0.5, 0.3))
    preparar("casal_com_2_cachorros.png", "card-tutor", 900, 1125, foco=(0.5, 0.35))
    preparar("gestante_com_cachorro.png", "card-gestante", 900, 1125, foco=(0.5, 0.3))
    preparar("cachorro_formatura.png", "card-eventos", 900, 1125, foco=(0.5, 0.3))
    preparar("mulher_praia_cachorro.png", "card-externo", 900, 1125, foco=(0.5, 0.4))

    # ---- GALERIA ----
    galeria = [
        ("cachorro_closeup.png", "galeria-01", 0.28),
        ("mulher_correndo_cachorro.png", "galeria-02", 0.4),
        ("gestante_com_cachorro.png", "galeria-03", 0.3),
        ("buldogue_frances.png", "galeria-04", 0.3),
        ("cachorro_bandana_laranja.png", "galeria-05", 0.35),
        ("casal_estudio_cachorro.png", "galeria-06", 0.25),
        ("cachorro_formatura.png", "galeria-07", 0.3),
        ("casal_com_2_cachorros.png", "galeria-08", 0.35),
        ("mulher_praia_cachorro.png", "galeria-09", 0.4),
        ("mulher_com_7_cachorros.png", "galeria-10", 0.3),
        ("gestante_com_gato.png", "galeria-11", 0.4),
    ]
    for origem, saida, foco_y in galeria:
        preparar(origem, saida, 800, 1000, foco=(0.5, foco_y))

    # OG: NAO gerado aqui -- e um card com nome/slogan por cima da foto,
    # renderizado a partir de ferramentas/og-card.html (ver render-og.mjs
    # ou o proprio README para o passo a passo de regerar).

    print("done")
