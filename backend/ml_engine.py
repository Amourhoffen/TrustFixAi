from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def recommend_providers(issue_tags, providers):
    """
    issue_tags: list of tags identified by AI (e.g. ["plumbing", "leak", "pipe"])
    providers: list of dicts [{"id": "1", "tags": ["plumber", "pipe fitting", "repair"]}]
    Returns a sorted list of provider dicts based on TF-IDF cosine similarity.
    """
    if not providers or not issue_tags:
        return []
    
    # Prepare documents for TF-IDF
    # Doc 0 is the issue tags
    issue_doc = " ".join(issue_tags).lower()
    
    # Doc 1 to N are provider tags
    provider_docs = [" ".join(p.get("tags", [])).lower() for p in providers]
    
    all_docs = [issue_doc] + provider_docs
    
    vectorizer = TfidfVectorizer()
    try:
        tfidf_matrix = vectorizer.fit_transform(all_docs)
    except ValueError:
        # Happens if vocabulary is empty or only stop words
        return []
        
    # Calculate cosine similarity between issue_doc (index 0) and all provider_docs (index 1 to N)
    cosine_sim = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:])
    
    # Extract scores and rank
    scores = cosine_sim[0]
    
    # Pair provider IDs with their scores
    ranked_providers = []
    for i, provider in enumerate(providers):
        if scores[i] > 0.05: # Only include those with some similarity threshold
            ranked_providers.append({
                "id": provider["id"],
                "score": float(scores[i]),
                "data": provider
            })
            
    # Sort descending by score
    ranked_providers.sort(key=lambda x: x["score"], reverse=True)
    
    # Return top 3 providers
    return [p["data"] for p in ranked_providers[:3]]
