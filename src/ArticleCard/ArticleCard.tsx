import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { IArticleInfo } from '../API/article.model';
import './ArticleCard.css';

interface IArticleCardProps {
  articleInfo: IArticleInfo,
}

export const ArticleCard = ({ articleInfo }: IArticleCardProps) => {
	return (
		<Card sx={{ maxWidth: 600 }} className='article-card' data-testid="article-card">
			<CardContent>
				<Typography variant='h6'>
          {articleInfo.name}
				</Typography>
				<Typography variant='subtitle2'>
					Views: {articleInfo.views.toLocaleString()} 
				</Typography>
				<Typography variant='subtitle2'>
					Rank: {articleInfo.rank}
				</Typography>
			</CardContent>
		</Card>
	);
}

