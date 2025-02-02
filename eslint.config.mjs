import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends('next/core-web-vitals', 'next/typescript'),
	{
		plugins: ['import', 'unused-imports'],
		rules: {
			// 사용되지 않는 import 자동 제거
			'unused-imports/no-unused-imports': 'error',
			'unused-imports/no-unused-vars': [
				'error',
				{ vars: 'all', args: 'after-used', ignoreRestSiblings: true },
			],

			// import 순서 정리
			'import/order': [
				'error',
				{
					groups: [
						'builtin', // 기본 내장 모듈 (e.g., fs, path)
						'external', // npm 패키지 (e.g., react)
						'internal', // 프로젝트 내 모듈 (절대 경로 import)
						['parent', 'sibling', 'index'], // 상대 경로 모듈
					],
					'newlines-between': 'always', // 그룹 간 개행 추가
					alphabetize: { order: 'asc', caseInsensitive: true },
				},
			],
		},
	},
];

export default eslintConfig;
