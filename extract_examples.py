import csv
import json
import re

def clean_tweet(text):
    if not text:
        return ""
    text = re.sub(r'https?://\S+', '', text)
    text = re.sub(r'@[A-Za-z0-9_]+', '', text)
    text = text.replace("&amp;", "&").replace("&lt;", "<").replace("&gt;", ">")
    text = re.sub(r'\s+', ' ', text).strip()
    text = text.strip('"\'')
    return text

def get_sarcasm_type(row):
    # Check rarer classes first to ensure all 6 classes get fair representation:
    # Understatement, Satire, Overstatement, Rhetorical Question, Irony, Sarcasm
    if row.get("understatement") == "1":
        return "Understatement"
    elif row.get("satire") == "1":
        return "Satire"
    elif row.get("overstatement") == "1":
        return "Overstatement"
    elif row.get("rhetorical_question") == "1":
        return "Rhetorical Question"
    elif row.get("irony") == "1":
        return "Irony"
    elif row.get("sarcasm") == "1":
        return "Sarcasm"
    return "Sarcasm"

def main():
    train_file = os.path.join("dataset", "train.csv") if os.path.exists(os.path.join("dataset", "train.csv")) else "train.csv"
    with open(train_file, "r", encoding="utf-8", errors="ignore") as f:
        reader = csv.DictReader(f)
        rows = list(reader)

    # Buckets for each type
    type_buckets = {
        "Understatement": [],
        "Satire": [],
        "Overstatement": [],
        "Rhetorical Question": [],
        "Irony": [],
        "Sarcasm": [],
    }
    non_sarcastic_candidates = []
    seen_texts = set()

    for r in rows:
        raw_text = r.get("tweet", "")
        cleaned = clean_tweet(raw_text)

        if len(cleaned) < 25 or len(cleaned) > 220:
            continue
        if cleaned.lower() in seen_texts:
            continue
        if not re.search(r'[a-zA-Z]{3,}', cleaned):
            continue

        seen_texts.add(cleaned.lower())

        is_sarc = r.get("sarcastic") == "1"
        if is_sarc:
            stype = get_sarcasm_type(r)
            type_buckets[stype].append({
                "text": cleaned,
                "isSarcastic": True,
                "expected": "YES",
                "category": "Social Media",
                "sarcasmType": stype
            })
        else:
            non_sarcastic_candidates.append({
                "text": cleaned,
                "isSarcastic": False,
                "expected": "NO",
                "category": "Genuine Statement",
                "sarcasmType": None
            })

    # Assemble 100 sarcastic examples with healthy balance across all 6 classes
    selected_sarcastic = []
    # Take all available understatements, satires, overstatements
    selected_sarcastic.extend(type_buckets["Understatement"][:10])
    selected_sarcastic.extend(type_buckets["Satire"][:15])
    selected_sarcastic.extend(type_buckets["Overstatement"][:20])
    selected_sarcastic.extend(type_buckets["Rhetorical Question"][:20])
    selected_sarcastic.extend(type_buckets["Irony"][:20])
    
    # Fill remaining to reach exactly 100 with Sarcasm
    remaining_needed = 100 - len(selected_sarcastic)
    selected_sarcastic.extend(type_buckets["Sarcasm"][:remaining_needed])

    selected_non_sarcastic = non_sarcastic_candidates[:100]

    all_examples = []
    curr_id = 1
    max_len = max(len(selected_sarcastic), len(selected_non_sarcastic))
    for i in range(max_len):
        if i < len(selected_sarcastic):
            item = selected_sarcastic[i]
            item["id"] = f"ex-{curr_id}"
            curr_id += 1
            all_examples.append(item)
        if i < len(selected_non_sarcastic):
            item = selected_non_sarcastic[i]
            item["id"] = f"ex-{curr_id}"
            curr_id += 1
            all_examples.append(item)

    print("Distribution of selected sarcastic examples:")
    for stype in type_buckets:
        cnt = sum(1 for e in selected_sarcastic if e["sarcasmType"] == stype)
        print(f"  {stype}: {cnt}")
    print(f"Total Sarcastic: {len(selected_sarcastic)}")
    print(f"Total Non-Sarcastic: {len(selected_non_sarcastic)}")
    print(f"Grand Total: {len(all_examples)}")

    js_content = "/**\n * Curated benchmark dataset of 200 real examples from training & test corpus\n * (~100 Sarcastic, ~100 Non-Sarcastic)\n * 6 Exact Types: Sarcasm, Irony, Satire, Understatement, Overstatement, Rhetorical Question\n */\n"
    js_content += f"export const EXAMPLES = {json.dumps(all_examples, indent=2)};\n"

    out_path = "dashboard-react/src/data/examples.js"
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(js_content)
    print(f"Successfully wrote examples to {out_path}")

if __name__ == "__main__":
    main()
