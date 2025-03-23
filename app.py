from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
def home():
    with open('index.html','r')as f:
        return f.read()

# Configure SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///vocabulary.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Define the Word model
class Word(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    word = db.Column(db.String(100), nullable=False)
    meaning = db.Column(db.String(500), nullable=False)
    example = db.Column(db.String(500), nullable=True)

# Initialize database
with app.app_context():
    db.create_all()  # This will create tables if they don't exist

# API to fetch all words
@app.route('/api/words', methods=['GET'])
def get_words():
    words = Word.query.all()
    return jsonify([{
        'id': word.id,
        'word': word.word,
        'meaning': word.meaning,
        'example': word.example
    } for word in words])

# API to add a new word
@app.route('/api/words', methods=['POST'])
def add_word():
    data = request.get_json()
    new_word = Word(word=data['word'], meaning=data['meaning'], example=data.get('example', ''))
    db.session.add(new_word)
    db.session.commit()
    return jsonify({'message': 'Word added successfully!'})

# Run the server
if __name__ == '__main__':
    app.run(debug=True)
