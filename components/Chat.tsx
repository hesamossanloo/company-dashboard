// Chat.tsx
import React, { useState, useEffect, useRef } from 'react';
import styles from '@/styles/Chat.module.css';

interface Message {
	type: 'user' | 'system';
	text: string;
}

const Chat = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState('');
	const messagesEndRef = useRef<HTMLDivElement | null>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(scrollToBottom, [messages]);

	const handleSend = () => {
		if (input.trim()) {
			setMessages([...messages, { type: 'user', text: input }]);
			// Here, we can add logic to generate system response, e.g. from ChatGPT
			setMessages((prev) => [...prev, { type: 'system', text: 'System response here' }]);
			setInput('');
		}
	};

	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			handleSend();
		}
	};

	return (
		<section className={styles.chatContainer}>
			<h1 className={styles.heading}>Chat Service</h1>
			<div className={styles.messages}>
				{messages.map((message, index) => (
					<div key={index} className={styles[message.type]}>
						{message.text}
					</div>
				))}
				<div ref={messagesEndRef} />
			</div>
			<div className={styles.inputArea}>
				<input
					name="chatInput"
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyPress={handleKeyPress}
					className={styles.input}
					placeholder="Type your message..."
				/>
				<button onClick={handleSend} className={styles.sendButton}>
					Send
				</button>
			</div>
		</section>
	);
};

export default Chat;
