#!/usr/bin/env python3
"""
f00tnotes No.001
Niantic Spatial — 게임으로 데이터 모으기 성공

10 cards @ 1080 × 1350 px
v2: 각주 한국어 깨짐 수정 + 내용 강화 + 각주 추가
"""

from PIL import Image, ImageDraw, ImageFont
import os

# ─── CONFIG ──────────────────────────────────────────────────────────────────
W, H   = 1080, 1350
MARGIN = 72
OUT    = "/Users/bobo/Desktop/f00tnotes/cardnews/"

BG      = (248, 247, 243)
INK     = (28,  28,  28)
INK_MED = (105, 100, 93)
INK_LT  = (170, 165, 157)
FN_BG   = (236, 233, 224)
RULE_LT = (200, 197, 190)

FONTS  = "/Users/bobo/Desktop/Study/Design/skills/skills/canvas-design/canvas-fonts/"
UFONTS = "/Users/bobo/Library/Fonts/"

os.makedirs(OUT, exist_ok=True)

# ─── FONT LOADER ─────────────────────────────────────────────────────────────
_cache = {}

def F(name, size):
    key = (name, size)
    if key not in _cache:
        paths = {
            'mono':    FONTS  + "IBMPlexMono-Regular.ttf",
            'mono_b':  FONTS  + "IBMPlexMono-Bold.ttf",
            'brico':   FONTS  + "BricolageGrotesque-Regular.ttf",
            'brico_b': FONTS  + "BricolageGrotesque-Bold.ttf",
            'ko_l':    UFONTS + "Pretendard-Light.ttf",
            'ko':      UFONTS + "Pretendard-Regular.ttf",
            'ko_m':    UFONTS + "Pretendard-Medium.ttf",
            'ko_sb':   UFONTS + "Pretendard-SemiBold.ttf",
            'ko_b':    UFONTS + "Pretendard-Bold.ttf",
            'ko_eb':   UFONTS + "Pretendard-ExtraBold.ttf",
        }
        _cache[key] = ImageFont.truetype(paths[name], size)
    return _cache[key]

# ─── UTILITIES ───────────────────────────────────────────────────────────────

def tw(d, text, fnt):
    bb = d.textbbox((0, 0), text, font=fnt)
    return bb[2] - bb[0]

def th(d, text, fnt):
    bb = d.textbbox((0, 0), text, font=fnt)
    return bb[3] - bb[1]

def wrap(d, text, fnt, max_w):
    words = text.split()
    lines, cur = [], ""
    for w in words:
        test = (cur + " " + w).strip()
        if tw(d, test, fnt) <= max_w:
            cur = test
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines

def multiline(d, text, fnt, x, y, max_w, fill=None, lhf=1.55):
    if fill is None:
        fill = INK
    lh = int(th(d, "가Ag", fnt) * lhf)
    for line in wrap(d, text, fnt, max_w):
        d.text((x, y), line, font=fnt, fill=fill)
        y += lh
    return y

def canvas():
    img = Image.new("RGB", (W, H), BG)
    return img, ImageDraw.Draw(img)

def header(d, page_num):
    y = 52
    d.text((MARGIN, y), "f00tnotes", font=F('mono', 23), fill=INK)
    pt = f"{page_num:02d} / 10"
    d.text((W - MARGIN - tw(d, pt, F('mono', 20)), y + 1), pt,
           font=F('mono', 20), fill=INK_MED)
    ry = y + 40
    d.line([(MARGIN, ry), (W - MARGIN, ry)], fill=INK, width=1)
    return ry + 30

def footer(d, left="", right="by f00tnotes"):
    ry = H - 82
    d.line([(MARGIN, ry), (W - MARGIN, ry)], fill=INK, width=1)
    f = F('mono', 18)
    if left:
        d.text((MARGIN, ry + 14), left, font=f, fill=INK_LT)
    if right:
        d.text((W - MARGIN - tw(d, right, f), ry + 14), right, font=f, fill=INK_LT)

def label_tag(d, text, x, y):
    f = F('mono', 17)
    pad_x, pad_y = 9, 5
    # textbbox returns (left, top, right, bottom) — top/left can be nonzero
    bb = d.textbbox((0, 0), text, font=f)
    text_w = bb[2] - bb[0]
    text_h = bb[3] - bb[1]
    rect_x1 = x + text_w + pad_x * 2
    rect_y1 = y + text_h + pad_y * 2
    d.rectangle([(x, y), (rect_x1, rect_y1)], outline=INK, width=1)
    # offset text draw position to cancel out bbox origin
    d.text((x + pad_x - bb[0], y + pad_y - bb[1]), text, font=f, fill=INK)
    return rect_y1 + 18

def dashed_line(d, y, x0=None, x1=None, color=None):
    if x0 is None: x0 = MARGIN
    if x1 is None: x1 = W - MARGIN
    if color is None: color = RULE_LT
    x = x0
    while x < x1:
        ex = min(x + 13, x1)
        d.line([(x, y), (ex, y)], fill=color, width=1)
        x += 20

def pull_quote(d, text, y):
    """Visually distinct pull quote / callout"""
    # Left accent bar
    d.rectangle([(MARGIN, y), (MARGIN + 4, y + 80)], fill=INK)
    f = F('ko_sb', 28)
    multiline(d, text, f, MARGIN + 22, y + 6, W - MARGIN*2 - 30,
              fill=INK, lhf=1.50)
    return y + 96

def footnote_zone(d, footnotes, zone_top):
    """
    footnotes: list of (marker_str, label_str, body_str)
    FIXED: Korean label uses ko_m font, marker uses mono
    """
    dashed_line(d, zone_top)
    zone_bottom = H - 88
    d.rectangle([(MARGIN, zone_top + 8), (W - MARGIN, zone_bottom - 4)],
                fill=FN_BG)

    f_marker = F('mono', 17)       # for "¹", "²" — ASCII only, mono OK
    f_label  = F('ko_m', 17)       # Korean label — must use KO font
    f_txt    = F('ko_l', 23)

    y = zone_top + 18
    for marker, label, text in footnotes:
        # Draw marker (ASCII) with mono
        d.text((MARGIN + 12, y), marker, font=f_marker, fill=INK_MED)
        mx = MARGIN + 12 + tw(d, marker, f_marker) + 6
        # Draw label (Korean) with ko_m
        d.text((mx, y + 1), label, font=f_label, fill=INK_MED)
        y += 24
        # Body
        y = multiline(d, text, f_txt, MARGIN + 18, y,
                      W - MARGIN*2 - 32, fill=INK, lhf=1.40)
        y += 10

# ─── CARDS ───────────────────────────────────────────────────────────────────

def card_01():
    """Cover"""
    img, d = canvas()

    # Top bar
    y = 52
    d.text((MARGIN, y), "f00tnotes", font=F('mono_b', 28), fill=INK)
    issue = "No.001  ·  2026.03"
    d.text((W - MARGIN - tw(d, issue, F('mono', 19)), y + 3),
           issue, font=F('mono', 19), fill=INK_MED)
    d.line([(MARGIN, y + 44), (W - MARGIN, y + 44)], fill=INK, width=2)

    # Main headline
    y = 148
    d.text((MARGIN, y), "게임으로", font=F('ko_eb', 92), fill=INK)
    y += 110
    d.text((MARGIN, y), "세계를", font=F('ko_eb', 92), fill=INK)
    y += 110
    d.text((MARGIN, y), "학습하다", font=F('ko_eb', 92), fill=INK)
    y += 116

    # Accent rule
    d.line([(MARGIN, y), (MARGIN + 180, y)], fill=INK_MED, width=1)
    y += 24

    # Sub headline
    sub = "포켓몬고가 10년 동안 조용히 만든 것"
    d.text((MARGIN, y), sub, font=F('ko_m', 32), fill=INK)
    y += 52

    # Teaser body
    body = "수억 명이 포켓몬을 잡는 동안, 한 회사는 조용히 세계에서 가장 방대한 현실 공간 지도를 완성하고 있었다. 그 지도가 지금 LA 배달 로봇의 눈이 됐다."
    y = multiline(d, body, F('ko_l', 27), MARGIN, y,
                  W - MARGIN*2 - 80, fill=INK_MED, lhf=1.62)
    y += 28

    # Ghost background text
    ghost = "NIANTIC"
    gf = F('brico_b', 148)
    gw = tw(d, ghost, gf)
    d.text((W - MARGIN - gw, H - 360), ghost, font=gf, fill=(228, 226, 218))

    # Issue contents box — footer rule is at H-82, leave 16px clearance
    footer_y = H - 82
    topics = [
        "Niantic Spatial 회사 소개",
        "300억 장 이미지의 의미",
        "자율주행 배달 로봇 Coco와의 협업",
        "GPS 한계와 VPS 해결책",
        "게임 → 데이터 → AI → 산업 밸류체인",
    ]
    topic_lh   = 28
    header_h   = 18 + 30  # rule gap + "이번 호 목차" line height
    total_h    = header_h + len(topics) * topic_lh + 4
    ctx_y      = footer_y - 16 - total_h

    d.line([(MARGIN, ctx_y), (W - MARGIN, ctx_y)], fill=RULE_LT, width=1)
    ctx_y += 18
    d.text((MARGIN, ctx_y), "이번 호 목차", font=F('ko_sb', 24), fill=INK)
    ctx_y += 30
    for t in topics:
        d.text((MARGIN + 14, ctx_y), "—", font=F('mono', 20), fill=INK_LT)
        d.text((MARGIN + 36, ctx_y), t, font=F('ko', 23), fill=INK_MED)
        ctx_y += topic_lh

    footer(d, left="", right="by f00tnotes")
    img.save(OUT + "card_01_cover.png")
    print("✓  01  cover")


def card_02():
    """Niantic Spatial 소개"""
    img, d = canvas()
    y = header(d, 2)
    y = label_tag(d, "COMPANY", MARGIN, y)

    d.text((MARGIN, y), "게임인 줄 알았는데,", font=F('ko_eb', 58), fill=INK)
    y += 70
    d.text((MARGIN, y), "지도 공장이었다", font=F('ko_eb', 58), fill=INK)
    y += 84

    b1 = "2024년 Niantic이 공간 AI 자회사를 분사¹했을 때, 게임 업계가 아닌 로보틱스·물류 업계가 주목했다. 이유는 하나 — 포켓몬고 이용자들이 10년간 쌓아준 데이터 때문이다."
    y = multiline(d, b1, F('ko', 29), MARGIN, y, W - MARGIN*2, lhf=1.56)
    y += 20

    b2 = "전 세계 수억 명이 AR 게임²을 즐기는 동안, 나이언틱은 어떤 위성도 드론 함대도 만들지 못하는 데이터를 수집하고 있었다. 인력 없이, 비용 없이. 이용자의 자발적 참여만으로."
    y = multiline(d, b2, F('ko', 29), MARGIN, y, W - MARGIN*2, lhf=1.56)
    y += 20

    y = pull_quote(d, "게임은 제품이었고, 데이터가 진짜 사업이었다.", y)

    footnote_zone(d, [
        ("¹", "분사 (스핀오프)",
         "모회사에서 특정 사업부를 독립 법인으로 떼어내는 것. Niantic은 게임 사업부와 공간 AI 사업부를 분리해 각각 독립적으로 운영하기로 했다."),
        ("²", "AR 게임 (증강현실 게임)",
         "현실 공간에 디지털 오브젝트를 겹쳐 보여주는 게임. 포켓몬고에서 플레이어는 실제 거리를 걸으며 가상의 포켓몬을 잡는다. 이 과정에서 카메라가 현실 이미지를 수집한다."),
    ], H - 310)

    footer(d)
    img.save(OUT + "card_02_company.png")
    print("✓  02  company")


def card_03():
    """300억 장 데이터"""
    img, d = canvas()
    y = header(d, 3)
    y = label_tag(d, "DATA ASSET", MARGIN, y)

    # Big number as design element
    d.text((MARGIN, y), "300억", font=F('ko_eb', 106), fill=INK)
    y += 120
    d.text((MARGIN, y), "당신이 포켓몬 잡는 동안 일어난 일", font=F('ko_m', 36), fill=INK_MED)
    y += 58

    d.line([(MARGIN, y), (MARGIN + 260, y)], fill=RULE_LT, width=1)
    y += 26

    b1 = "포켓스탑¹을 스캔할 때마다 GPS 좌표, 촬영 방향, 공간 깊이 정보가 함께 서버로 올라갔다. 플레이어는 게임 아이템을 얻었고, 나이언틱은 현실 세계의 3D 단면을 얻었다."
    y = multiline(d, b1, F('ko', 29), MARGIN, y, W - MARGIN*2, lhf=1.56)
    y += 20

    b2 = "한 명이 하루 100장씩 찍으면 8억 년이 걸리는 분량이다. 수억 명이 동시에, 자발적으로, 전 세계 도시를 스캔했기 때문에 나온 숫자다."
    y = multiline(d, b2, F('ko', 29), MARGIN, y, W - MARGIN*2, lhf=1.56)
    y += 20

    b3 = "지금 이 데이터²를 처음부터 모으려는 회사가 있다면, 나이언틱을 따라잡는 데 최소 10년이 필요하다. 돈으로는 해결되지 않는다. 이것이 데이터 해자의 본질이다."
    y = multiline(d, b3, F('ko_sb', 29), MARGIN, y, W - MARGIN*2, lhf=1.56)

    footnote_zone(d, [
        ("¹", "포켓스탑 (PokéStop)",
         "포켓몬고 내 현실 랜드마크 기반 게임 오브젝트. 공원 조형물, 벽화, 건물 입구 등이 포켓스탑으로 지정되며, 플레이어가 가까이 가서 스캔하면 3D 공간 데이터가 수집된다."),
        ("²", "현실 공간 데이터 (Spatial Data)",
         "단순 사진이 아닌 GPS 좌표·방향·촬영 각도가 함께 기록된 이미지 집합. 이를 수백만 장 쌓으면 도시 공간의 3D 구조를 재구성할 수 있다."),
    ], H - 305)

    footer(d)
    img.save(OUT + "card_03_data.png")
    print("✓  03  data")


def card_04():
    """어떻게 모았냐고?"""
    img, d = canvas()
    y = header(d, 4)
    y = label_tag(d, "HOW IT WORKS", MARGIN, y)

    d.text((MARGIN, y), "어떻게 모았냐고?", font=F('ko_eb', 62), fill=INK)
    y += 76
    d.text((MARGIN, y), "포켓몬이 유인했다", font=F('ko_eb', 62), fill=INK)
    y += 84

    steps = [
        ("01", "포켓몬을 잡으려면 현실 거리를 걸어야 한다"),
        ("02", "앱이 카메라로 주변 환경을 실시간으로 인식한다"),
        ("03", "포켓스탑·랜드마크를 AR 스캔¹하면 3D 데이터가 쌓인다"),
        ("04", "이 데이터가 월드모델² AI 학습에 활용된다"),
    ]

    f_num  = F('mono_b', 22)
    f_step = F('ko', 28)
    pt_w   = W - MARGIN*2 - 60

    for num_txt, text in steps:
        nw = tw(d, num_txt, f_num)
        d.text((MARGIN, y + 4), num_txt, font=f_num, fill=INK_LT)
        y = multiline(d, text, f_step, MARGIN + nw + 18, y, pt_w, lhf=1.50)
        y += 14

    y += 8
    b_end = "플랫폼 설계의 정수다. 사용자는 재미있어서 했고, 나이언틱은 그 행동을 데이터로 전환했다. 보상 구조가 10년짜리 전 세계 수집 엔진을 만들었다. 이것이 플랫폼 비즈니스가 제조업보다 강한 이유다."
    multiline(d, b_end, F('ko_sb', 27), MARGIN, y, W - MARGIN*2, lhf=1.55)

    footnote_zone(d, [
        ("¹", "AR 스캔 (Niantic Lightship Scan)",
         "포켓몬고 앱 내 3D 스캔 기능. 플레이어가 포켓스탑 주위를 카메라로 돌며 촬영하면, 앱이 자동으로 3D 메시(mesh)를 생성해 서버에 전송한다."),
        ("²", "월드모델 (World Model)",
         "현실 공간의 구조·배치·맥락을 이해하는 AI 모델. '이 건물이 어디 있는가'를 넘어 '이 장소가 어떤 장소인가'까지 시각적으로 파악한다. 자율주행·로보틱스의 핵심 기반 기술이다."),
    ], H - 302)

    footer(d)
    img.save(OUT + "card_04_howto.png")
    print("✓  04  how it works")


def card_05():
    """첫 번째 테스트: Coco Robotics"""
    img, d = canvas()
    y = header(d, 5)
    y = label_tag(d, "FIRST TEST", MARGIN, y)

    d.text((MARGIN, y), "로봇이 차도", font=F('ko_eb', 60), fill=INK)
    y += 74
    d.text((MARGIN, y), "한가운데 멈춘 날", font=F('ko_eb', 60), fill=INK)
    y += 86

    b1 = "나이언틱 VPS의 첫 번째 실전 고객은 LA 기반 자율주행 배달 로봇 스타트업 Coco Robotics다. 도시 인도(인도¹)를 시속 5km로 달리는 귀여운 외형 뒤에는 냉혹한 기술 요구사항이 있었다."
    y = multiline(d, b1, F('ko', 29), MARGIN, y, W - MARGIN*2, lhf=1.56)
    y += 20

    b2 = "기존 배달 로봇은 GPS를 믿었다. 도심 빌딩 숲에서 GPS 오차가 수십 미터로 벌어지면, 로봇은 자신이 인도에 있다고 믿으면서 차도 위에 서 있었다. 실제로 사고가 났다."
    y = multiline(d, b2, F('ko', 29), MARGIN, y, W - MARGIN*2, lhf=1.56)
    y += 20

    b3 = "라스트마일² 배송 사업의 신뢰성은 단 하나에 달려 있다. '이 로봇이 항상 안전하게 도착한다.' Coco에게 더 정확한 눈이 필요했다."
    y = multiline(d, b3, F('ko_sb', 29), MARGIN, y, W - MARGIN*2, lhf=1.56)

    footnote_zone(d, [
        ("¹", "인도 (Sidewalk) 주행",
         "Coco 로봇은 차도가 아닌 인도 위를 시속 약 5km로 주행한다. 보행자와 같은 공간을 공유하기 때문에 cm 단위의 정밀한 위치 인식이 필수다."),
        ("²", "라스트마일 배송 (Last-mile Delivery)",
         "물류 허브에서 최종 소비자 문 앞까지의 마지막 배송 구간. 전체 배송 비용의 약 50%를 차지하며, 효율화 경쟁이 치열한 영역이다."),
    ], H - 302)

    footer(d)
    img.save(OUT + "card_05_robot.png")
    print("✓  05  robot")


def card_06():
    """GPS의 한계"""
    img, d = canvas()
    y = header(d, 6)
    y = label_tag(d, "THE PROBLEM", MARGIN, y)

    d.text((MARGIN, y), "지도가 틀릴 때,", font=F('ko_eb', 60), fill=INK)
    y += 74
    d.text((MARGIN, y), "로봇은 어떻게 되는가", font=F('ko_eb', 60), fill=INK)
    y += 86

    b1 = "GPS¹는 위성 신호를 삼각측량해서 위치를 계산한다. 탁 트인 공간에서는 오차 3~5m 수준으로 잘 작동한다."
    y = multiline(d, b1, F('ko', 29), MARGIN, y, W - MARGIN*2, lhf=1.56)
    y += 20

    b2 = "문제는 도시다. 고층 빌딩 사이에서 신호가 반사·차단되는 어반 캐니언² 효과가 발생하면 오차는 20~50m로 벌어진다. 당신의 지도 앱이 '건물 안에 있다'고 표시할 때, 실제로는 도로 위일 수 있다."
    y = multiline(d, b2, F('ko', 29), MARGIN, y, W - MARGIN*2, lhf=1.56)
    y += 20

    b3 = "사람은 틀린 지도를 보면서도 눈으로 수정한다. 로봇은 좌표만 믿는다. 이것이 GPS 기반 자율주행이 도심에서 한계를 갖는 이유다."
    y = multiline(d, b3, F('ko_sb', 29), MARGIN, y, W - MARGIN*2, lhf=1.56)

    footnote_zone(d, [
        ("¹", "GPS (Global Positioning System)",
         "미국 국방부가 운영하는 위성항법 시스템. 지구 궤도 위성 24개에서 신호를 받아 위치를 계산한다. 한국에서는 KPS(한국형 위성항법) 구축도 진행 중이다."),
        ("²", "어반 캐니언 효과 (Urban Canyon Effect)",
         "고층 빌딩이 좁은 간격으로 늘어선 도심 골목에서, GPS 위성 신호가 건물 벽에 반사되어 직접 신호와 반사 신호가 혼재하는 현상. 위치 오차가 수십~수백 미터로 커질 수 있다."),
    ], H - 320)

    footer(d)
    img.save(OUT + "card_06_gps.png")
    print("✓  06  GPS")


def card_07():
    """VPS 해결책"""
    img, d = canvas()
    y = header(d, 7)
    y = label_tag(d, "SOLUTION", MARGIN, y)

    d.text((MARGIN, y), "나이언틱의 답:", font=F('ko_eb', 60), fill=INK)
    y += 74
    d.text((MARGIN, y), "눈으로 위치를 찾아라", font=F('ko_eb', 60), fill=INK)
    y += 86

    b1 = "VPS¹(Visual Positioning System)는 카메라 이미지를 3D 공간 지도와 비교해 위치를 계산한다. 위성도 기지국도 필요 없다. 건물 생김새, 창문 배치, 간판 위치 — 공간의 시각적 특징이 곧 좌표가 된다."
    y = multiline(d, b1, F('ko', 29), MARGIN, y, W - MARGIN*2, lhf=1.56)
    y += 20

    b2 = "오차는 GPS의 수십 미터에서 cm 단위²로 줄어든다. 실내·지하에서도 작동한다는 것이 GPS 대비 결정적 차이다."
    y = multiline(d, b2, F('ko', 29), MARGIN, y, W - MARGIN*2, lhf=1.56)
    y += 20

    b3 = "이 3D 지도를 구축하는 데 쓰인 원천 데이터가 포켓몬고 플레이어들이 10년에 걸쳐 제공한 300억 장이다. 기술이 데이터를 기다렸다. 데이터가 먼저였다."
    y = multiline(d, b3, F('ko_sb', 29), MARGIN, y, W - MARGIN*2, lhf=1.56)

    footnote_zone(d, [
        ("¹", "VPS vs. GPS vs. LiDAR",
         "GPS는 위성 기반·저비용·낮은 정밀도. LiDAR는 레이저 센서 기반·고비용·고정밀. VPS는 카메라 이미지 기반으로 LiDAR에 가까운 정밀도를 저비용으로 달성한다. 스마트폰 카메라로도 구동 가능하다."),
        ("²", "cm 단위 측위",
         "일반 GPS 오차(3~50m)와 비교해 수 cm 수준의 위치 정확도. 로봇이 특정 문 앞에 정확히 멈추거나 좁은 인도를 벗어나지 않고 주행하는 데 필수적인 수준이다."),
    ], H - 310)

    footer(d)
    img.save(OUT + "card_07_vps.png")
    print("✓  07  VPS")


def card_08():
    """코코 × 나이언틱 협력 상세"""
    img, d = canvas()
    y = header(d, 8)
    y = label_tag(d, "PARTNERSHIP", MARGIN, y)

    d.text((MARGIN, y), "어떻게 협력했나", font=F('ko_eb', 64), fill=INK)
    y += 82

    points = [
        ("→", "Coco 로봇 본체에 카메라 4대 탑재, 360° 주변 인식"),
        ("→", "나이언틱 VPS로 로봇 실시간 위치 계산 (GPS 병행 아닌 대체)"),
        ("→", "포켓몬고로 수집한 도시 공간 데이터를 로봇 경로 지도에 적용"),
        ("→", "GPS 불안정 구간에서도 ±수 cm 수준의 측위 목표"),
    ]

    f_arr = F('mono', 26)
    f_pt  = F('ko', 28)
    pt_w  = W - MARGIN*2 - 52

    for arrow, text in points:
        d.text((MARGIN, y + 4), arrow, font=f_arr, fill=INK_LT)
        y = multiline(d, text, f_pt, MARGIN + 44, y, pt_w, lhf=1.50)
        y += 14

    y += 10
    b_end = "단순 위치 확인을 넘어, 로봇이 '이곳이 인도인지 차도인지'를 공간 맥락¹으로 판단하고, 주변 보행자²를 인식하는 방향으로 기술을 확장 중이다."
    multiline(d, b_end, F('ko_sb', 28), MARGIN, y, W - MARGIN*2, lhf=1.55)

    footnote_zone(d, [
        ("¹", "공간 맥락 인식 (Spatial Context)",
         "단순 좌표('내가 어디 있는가')를 넘어 '이 장소가 어떤 공간인가'를 이해하는 것. 인도·차도·횡단보도 구분, 건물 입구 위치 파악, 사람이 모이는 패턴 분석 등이 포함된다."),
        ("²", "보행자 인식과 규제",
         "인도 위를 주행하는 배달 로봇은 보행자와 같은 공간을 공유한다. 미국 일부 주에서는 인도 로봇 속도·크기를 규제하며, Coco는 시속 5km 이하로 운행한다."),
    ], H - 300)

    footer(d)
    img.save(OUT + "card_08_partnership.png")
    print("✓  08  partnership")


def card_09():
    """밸류체인"""
    img, d = canvas()
    y = header(d, 9)
    y = label_tag(d, "VALUE CHAIN", MARGIN, y)

    d.text((MARGIN, y), "게임 하나가", font=F('ko_eb', 64), fill=INK)
    y += 78
    d.text((MARGIN, y), "인프라가 됐다", font=F('ko_eb', 64), fill=INK)
    y += 86

    # Value chain boxes
    chain = [
        ("GAME",     "포켓몬고\n게임 플레이"),
        ("DATA",     "300억 장\n현실 이미지"),
        ("MODEL",    "VPS·월드모델\nAI 학습"),
        ("INDUSTRY", "로보틱스·물류\n산업 적용"),
    ]

    box_w = 192
    box_h = 106
    gap   = 24
    total = len(chain) * box_w + (len(chain) - 1) * gap
    sx    = (W - total) // 2
    by    = y

    f_tag = F('mono', 15)
    f_lbl = F('ko_m', 21)

    for i, (tag, lbl) in enumerate(chain):
        bx = sx + i * (box_w + gap)
        d.rectangle([(bx, by), (bx + box_w, by + box_h)], fill=INK)
        ttw = tw(d, tag, f_tag)
        d.text((bx + (box_w - ttw)//2, by + 10), tag, font=f_tag, fill=BG)
        for li, line in enumerate(lbl.split("\n")):
            lw = tw(d, line, f_lbl)
            d.text((bx + (box_w - lw)//2, by + 36 + li*28),
                   line, font=f_lbl, fill=BG)
        if i < len(chain) - 1:
            ax = bx + box_w + 4
            ay = by + box_h // 2
            d.line([(ax, ay), (ax + gap - 8, ay)], fill=INK_LT, width=2)
            d.polygon([(ax+gap-8, ay-6), (ax+gap-8, ay+6), (ax+gap, ay)],
                      fill=INK_LT)

    y = by + box_h + 34

    b1 = "AR 게임에서 출발한 데이터가 로보틱스·물류 인프라로 전환되는 사례. '게임 → 데이터 → AI 모델 → 산업 적용'의 밸류체인¹을 실증했다."
    y = multiline(d, b1, F('ko', 29), MARGIN, y, W - MARGIN*2, lhf=1.56)
    y += 20

    b2 = "데이터 해자²란 이렇게 만들어진다. 경쟁사가 10년 뒤 같은 데이터를 모으려 해도 불가능하다."
    multiline(d, b2, F('ko_sb', 29), MARGIN, y, W - MARGIN*2, lhf=1.56)

    footnote_zone(d, [
        ("¹", "밸류체인 (Value Chain)",
         "원자재에서 최종 서비스까지 각 단계에서 가치가 추가되는 흐름. 나이언틱 사례: 게임(원자재) → 이미지 DB → AI 모델 → 로봇·물류 서비스(최종 제품)."),
        ("²", "데이터 해자 (Data Moat)",
         "경쟁자가 복제하기 어려운 독점적 데이터 자산. 규모, 수집 경로, 수집에 걸린 시간이 해자의 깊이를 결정한다. 나이언틱의 경우 10년간 수억 명이 자발적으로 쌓은 데이터라 재현이 사실상 불가능하다."),
    ], H - 308)

    footer(d)
    img.save(OUT + "card_09_valuechain.png")
    print("✓  09  value chain")


def card_10():
    """마무리"""
    img, d = canvas()
    y = header(d, 10)
    y = label_tag(d, "TAKEAWAY", MARGIN, y)

    d.text((MARGIN, y), "f00tnotes 정리", font=F('ko_eb', 60), fill=INK)
    y += 80

    points = [
        "포켓몬고는 게임이면서 동시에 세계 최대 규모의 현실 공간 데이터 수집 프로젝트였다",
        "300억 장 이미지로 학습한 VPS는 GPS가 실패하는 도심에서도 cm 단위 측위가 가능하다",
        "첫 고객 Coco Robotics 협업으로 '게임 데이터 → 로보틱스 인프라' 경로를 입증했다",
        "데이터 해자는 경쟁사가 따라오기 시작한 시점에 이미 수년의 격차가 벌어져 있다",
        "플랫폼 비즈니스의 진짜 자산은 때로 예상 밖의 방식으로 쌓인다",
    ]

    f_pt  = F('ko', 27)
    f_dot = F('mono', 24)
    pt_w  = W - MARGIN*2 - 44

    for pt in points:
        d.text((MARGIN, y + 5), "—", font=f_dot, fill=INK_LT)
        y = multiline(d, pt, f_pt, MARGIN + 36, y, pt_w, lhf=1.55)
        y += 14

    y += 18

    d.line([(MARGIN, y), (MARGIN + 160, y)], fill=RULE_LT, width=1)
    y += 22
    d.text((MARGIN, y), "다음 호에서 계속", font=F('ko_l', 24), fill=INK_MED)
    y += 36
    d.text((MARGIN, y), "공간 AI가 바꾸는 물류 지도", font=F('ko_sb', 28), fill=INK)

    # Brand block
    brand_y = H - 200
    d.rectangle([(MARGIN, brand_y), (W - MARGIN, brand_y + 104)], fill=INK)
    brand_txt = "f00tnotes"
    bw = tw(d, brand_txt, F('mono_b', 38))
    d.text(((W - bw) // 2, brand_y + 14), brand_txt,
           font=F('mono_b', 38), fill=BG)
    sub_txt = "아는 것 사이의 빈 공간을 채웁니다"
    sw = tw(d, sub_txt, F('ko_l', 23))
    d.text(((W - sw) // 2, brand_y + 62), sub_txt,
           font=F('ko_l', 23), fill=(175, 173, 165))

    footer(d, left="Issue No.001", right="2026.03")
    img.save(OUT + "card_10_outro.png")
    print("✓  10  outro")


# ─── MAIN ────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    print("f00tnotes No.001 — generating cards (v2)...\n")
    card_01()
    card_02()
    card_03()
    card_04()
    card_05()
    card_06()
    card_07()
    card_08()
    card_09()
    card_10()
    print(f"\n✓ All 10 cards saved to {OUT}")
