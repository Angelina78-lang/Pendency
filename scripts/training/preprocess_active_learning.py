import json
import argparse
import random
import sys

def calculate_uncertainty(example):
    """
    Simulates uncertainty calculation. 
    In a real scenario, this would use model confidence logits.
    Here we use 'risk_score' variance and 'days_silent' outlier detection.
    """
    try:
        data = json.loads(example)
        # Assuming format from generator
        # Logic: Higher risk scores or extreme silence days = higher value training data
        risk = data.get('risk_score', 50)
        silence = data.get('days_silent', 30)
        
        # Simple heuristic for "uncertainty/importance"
        score = (risk / 100.0) + (silence / 365.0)
        return score, data
    except:
        return 0, {}

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True, help="Input JSONL file")
    parser.add_argument("--output", required=True, help="Output prioritized JSONL file")
    parser.add_argument("--keep_ratio", type=float, default=0.1, help="Ratio of data to keep (e.g. 0.1 for 10%%)")
    args = parser.parse_args()

    print(f"[*] Analyzing {args.input} for Active Learning...")

    examples = []
    try:
        with open(args.input, 'r', encoding='utf-8') as f:
            for line in f:
                score, data = calculate_uncertainty(line)
                if data:
                    examples.append((score, line))
    except FileNotFoundError:
        print(f"Error: File {args.input} not found.")
        sys.exit(1)

    # Sort by "uncertainty" (descending)
    examples.sort(key=lambda x: x[0], reverse=True)

    # Keep top N%
    keep_count = int(len(examples) * args.keep_ratio)
    selected_examples = examples[:keep_count]

    print(f"[*] Filtered {len(examples)} -> {len(selected_examples)} (Top {args.keep_ratio*100}%)")

    with open(args.output, 'w', encoding='utf-8') as f:
        for _, line in selected_examples:
            f.write(line)

    print(f"[*] Saved prioritized dataset to {args.output}")

if __name__ == "__main__":
    main()
